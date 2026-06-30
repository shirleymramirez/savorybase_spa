"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, MapPin, ShieldCheck, AlertCircle } from "lucide-react";
import { useCart } from "@/components/cart-provider";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

interface FormErrors {
  email?: string;
  phone?: string;
  recipientName?: string;
  message?: string;
  paymentMethod?: string;
}

interface CheckoutDraft {
  email?: string;
  phone?: string;
  recipientName?: string;
  message?: string;
  paymentMethod?: string | null;
}

function readStoredCheckoutDraft(): CheckoutDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawDraft = window.sessionStorage.getItem("checkoutDraft");
    if (rawDraft) {
      return JSON.parse(rawDraft) as CheckoutDraft;
    }

    const rawCheckout = window.sessionStorage.getItem("checkoutData");
    if (!rawCheckout) {
      return null;
    }

    const checkoutData = JSON.parse(rawCheckout) as {
      customer?: { email?: string; phone?: string };
      recipientName?: string;
      message?: string;
      paymentMethod?: string | null;
    };

    return {
      email: checkoutData.customer?.email ?? "",
      phone: checkoutData.customer?.phone ?? "",
      recipientName: checkoutData.recipientName ?? "",
      message: checkoutData.message ?? "",
      paymentMethod: checkoutData.paymentMethod ?? null
    };
  } catch (error) {
    console.error("Failed to load checkout draft", error);
    return null;
  }
}

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();

  const initialDraft = readStoredCheckoutDraft();

  const [email, setEmail] = useState(initialDraft?.email ?? "");
  const [phone, setPhone] = useState(initialDraft?.phone ?? "");
  const [recipientName, setRecipientName] = useState(initialDraft?.recipientName ?? "");
  const [message, setMessage] = useState(initialDraft?.message ?? "");

  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedMethod, setSelectedMethod] = useState<string | null>(initialDraft?.paymentMethod ?? null);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        "checkoutDraft",
        JSON.stringify({
          email,
          phone,
          recipientName,
          message,
          paymentMethod: selectedMethod
        })
      );
    } catch (error) {
      console.error("Failed to save checkout draft", error);
    }
  }, [email, phone, recipientName, message, selectedMethod]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + parseFoodPrice(item.food.price) * item.quantity,
        0
      ),
    [items]
  );
  const grandTotal = subtotal;

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <ShieldCheck className="h-12 w-12 text-[#6E7A5E]" aria-hidden="true" />
        <h1 className="mt-5 text-4xl font-bold text-[#2B241E]">Your checkout is ready once you add items</h1>
        <p className="mt-4 max-w-xl text-[#4F463B]">
          Add something delicious to your cart and come back here to finalize your order.
        </p>
        <Link
          href="/cart"
          className="mt-8 rounded-md bg-[#D9C7A7] px-5 py-3 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
        >
          Back to cart
        </Link>
      </main>
    );
  }

  // Clear specific field errors when user starts typing or fixes the field
  const clearFieldError = (fieldName: keyof FormErrors) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) {
      newErrors.phone = "Please enter a valid US phone number.";
    }

    if (!recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required.";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required.";
    }

    if (!selectedMethod) {
      newErrors.paymentMethod = "Please select a payment method.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      // Find the first error component and scroll to it smoothly
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const checkoutData = {
      items,
      customer: { email, phone },
      recipientName,
      message,
      paymentMethod: selectedMethod,
      totals: { subtotal, shipping: 0, tax: 0, grandTotal }
    };

    try {
      sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    } catch (e) {
      console.error("Failed to save checkout data to sessionStorage", e);
    }

    router.push("/checkout/summary");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6E7A5E]">Secure checkout</p>
        <h1 className="text-4xl font-bold text-[#2B241E]">Complete your order</h1>
        <p className="max-w-2xl text-[#4F463B]">
          Review the order, add your delivery details, and confirm your payment in a few quick steps.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <section className="space-y-6">
          <article className="rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#6E7A5E]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#2B241E]">Customer information</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E]">
                Email address
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  aria-invalid={!!errors.email}
                  className={`h-11 rounded-md border bg-[#FFFDF7] px-3 text-sm text-[#2B241E] placeholder:text-[#bdb8b0] outline-none transition focus:ring-2 focus:ring-[#C7D3B5] ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-[#D8CDBB] focus:border-[#6E7A5E]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                  </p>
                )}
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E]">
                Phone number
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearFieldError("phone");
                  }}
                  aria-invalid={!!errors.phone}
                  className={`h-11 rounded-md border bg-[#FFFDF7] px-3 text-sm text-[#2B241E] placeholder:text-[#bdb8b0] outline-none transition focus:ring-2 focus:ring-[#C7D3B5] ${
                    errors.phone ? "border-red-500 focus:border-red-500" : "border-[#D8CDBB] focus:border-[#6E7A5E]"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.phone}
                  </p>
                )}
              </label>
            </div>
          </article>

          <article className="rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#6E7A5E]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#2B241E]">Pickup & Fulfillment Details</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E] sm:col-span-2">
                Recipient name
                <input
                  type="text"
                  placeholder="Enter recipient name"
                  value={recipientName}
                  onChange={(e) => {
                    setRecipientName(e.target.value);
                    clearFieldError("recipientName");
                  }}
                  aria-invalid={!!errors.recipientName}
                  className={`h-11 rounded-md border bg-[#FFFDF7] px-3 text-sm text-[#2B241E] placeholder:text-[#bdb8b0] outline-none transition focus:ring-2 focus:ring-[#C7D3B5] ${
                    errors.recipientName ? "border-red-500 focus:border-red-500" : "border-[#D8CDBB] focus:border-[#6E7A5E]"
                  }`}
                />
                {errors.recipientName && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.recipientName}
                  </p>
                )}
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E] sm:col-span-2">
                Date and Time of Pickup
                <textarea
                  rows={3}
                  placeholder="Enter any specific instructions or preferred pickup time"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearFieldError("message");
                  }}
                  aria-invalid={!!errors.message}
                  className="rounded-md border border-[#D8CDBB] bg-[#FFFDF7] px-3 py-3 text-sm text-[#2B241E] placeholder:text-[#bdb8b0] outline-none transition focus:border-[#6E7A5E] focus:ring-2 focus:ring-[#C7D3B5]"
                />
                  {errors.message && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.message}
                  </p>
                )}
              </label>
            </div>
          </article>

          <article className="rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-[#6E7A5E]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#2B241E]">Payment method</h2>
            </div>
            <p className="mt-2 text-sm text-[#62584B]">Payment can be made with any of the following methods:</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {['Cash', 'Zelle'].map((method) => {
                const isSelected = selectedMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setSelectedMethod(method);
                      clearFieldError("paymentMethod");
                    }}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#3F4A36] focus:ring-offset-2 ${
                      isSelected
                        ? 'border-[#3F4A36] bg-[#3F4A36] text-white'
                        : 'border-[#D8CDBB] bg-[#FAF7EF] text-[#4F463B] hover:bg-[#F3EFE6]'
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
            {errors.paymentMethod && (
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-600">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.paymentMethod}
              </p>
            )}
          </article>
        </section>

        <aside className="rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-[#2B241E]">Order summary</h2>
          <ul className="mt-5 space-y-4 text-sm text-[#4F463B]">
            {items.map((item) => {
              const unitPrice = parseFoodPrice(item.food.price);
              return (
                <li key={item.food.id} className="flex items-start justify-between gap-4 rounded-md bg-[#FAF7EF] p-3">
                  <div>
                    <p className="font-semibold text-[#2B241E]">{item.food.title}</p>
                    <p className="text-xs uppercase tracking-wide text-[#6E7A5E]">Qty {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-[#2B241E]">{currencyFormatter.format(unitPrice * item.quantity)}</span>
                </li>
              );
            })}
          </ul>

          <dl className="mt-6 space-y-3 text-sm text-[#4F463B]">
            <div className="flex items-center justify-between gap-4">
              <dt>Subtotal</dt>
              <dd className="font-semibold text-[#2B241E]">{currencyFormatter.format(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[#D8CDBB] pt-4 text-base">
              <dt className="font-bold text-[#2B241E]">Grand total</dt>
              <dd className="font-bold text-[#2B241E]">{currencyFormatter.format(grandTotal)}</dd>
            </div>
          </dl>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-[#D9C7A7] px-5 text-base font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
          >
            Place order
          </button>
          <p className="mt-3 text-xs text-[#62584B]">By placing your order, you agree to our secure checkout terms and delivery policies.</p>
        </aside>
      </div>
    </main>
  );
}

function parseFoodPrice(price: string) {
  const value = Number.parseFloat(price.replace(/[^0-9.]/g, ""));

  return Number.isFinite(value) ? value : 0;
}

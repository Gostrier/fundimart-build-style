import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Phone, AlertCircle } from "lucide-react";

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ isOpen, onOpenChange }: CheckoutDialogProps) => {
  const { totalPrice, clearCart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.startsWith("254")) {
      return cleaned;
    } else if (cleaned.startsWith("07")) {
      return "254" + cleaned.substring(1);
    }
    return cleaned;
  };

  const isValidPhoneNumber = (number: string) => {
    const formatted = formatPhoneNumber(number);
    return formatted.startsWith("254") && formatted.length === 12;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Please enter a valid Kenyan phone number (07XX XXXXXX or 254...)")
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      // Call backend API (backend handles actual M-Pesa integration)
      const response = await fetch("/api/mpesa/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment initiation failed. Please try again.");
      }

      const data = await response.json();
      
      setSuccess(true);
      setPhoneNumber("");
      
      setTimeout(() => {
        clearCart();
        onOpenChange(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>M-Pesa Payment</DialogTitle>
          <DialogDescription>
            Enter your M-Pesa phone number to complete your order
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="font-semibold text-lg">Payment Initiated</h3>
            <p className="text-sm text-muted-foreground text-center">
              Check your phone for the M-Pesa prompt to complete payment
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="text-sm font-medium mb-2 block">
                M-Pesa Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07XX XXXXXX or 254XXXXXXXXX"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Format: 07XX XXXXXX (10 digits) or 254XXXXXXXXX (12 digits)
              </p>
            </div>

            {error && (
              <div className="flex gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount to Pay</span>
                <span className="font-bold text-foreground">
                  KES {totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                You will receive a prompt on your M-Pesa phone to enter your PIN
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading || !phoneNumber.trim()}
              >
                {isLoading ? "Processing..." : "Pay with M-Pesa"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;

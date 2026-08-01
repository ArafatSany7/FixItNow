"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  onSuccess?: () => void;
}

export function ReviewModal({ isOpen, onClose, bookingId, onSuccess }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Rating required", { description: "Please select a star rating." });
      return;
    }
    if (!comment.trim()) {
      toast.error("Comment required", { description: "Please provide a brief comment about your experience." });
      return;
    }

    try {
      setIsSubmitting(true);
      const token = Cookies.get("accessToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify({
          bookingId,
          rating,
          comment
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      toast.success("Review Submitted", {
        description: "Thank you for your feedback!",
      });

      if (onSuccess) {
        onSuccess();
      }

      setRating(0);
      setComment("");
      onClose();
      router.refresh();

    } catch (error: any) {
      toast.error("Submission Error", {
        description: error.message || "Could not submit your review.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background border border-secondary/20 rounded-2xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text/50 hover:text-text rounded-full p-1 hover:bg-secondary/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-5">
            <h2 className="text-xl font-bold text-text mb-1">Rate Your Experience</h2>
            <p className="text-sm text-text/60">
              Please share your feedback to help us maintain a high standard of service!
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`h-10 w-10 ${star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-secondary/30"
                    }`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you liked or what could be improved..."
            className="w-full min-h-[120px] p-3 text-sm bg-secondary/5 border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-text placeholder:text-text/40 resize-y"
          />

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full border-secondary/20 text-text/80 hover:bg-secondary/10"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="w-full bg-primary text-background hover:bg-primary/90 shadow-md"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

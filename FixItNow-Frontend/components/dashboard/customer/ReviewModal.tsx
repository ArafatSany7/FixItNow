"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

export function ReviewModal({ isOpen, onClose, bookingId }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

      // Reset state and close modal
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border border-secondary/20 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-text">Rate Your Experience</DialogTitle>
          <DialogDescription className="text-text/60">
            Please share your feedback to help us maintain a high standard of service!
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
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
                  className={`h-10 w-10 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-secondary/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you liked or what could be improved..."
            className="min-h-[120px] bg-secondary/5 border-secondary/20 focus-visible:ring-primary rounded-xl"
          />
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3 sm:space-x-0">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

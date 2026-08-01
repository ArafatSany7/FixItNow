"use client";

import { motion } from "framer-motion";
import { Star, MapPin, BadgeCheck, ShieldCheck, Zap } from "lucide-react";
import { BookingCalendar } from "./BookingCalendar";

interface TechnicianProfileProps {
  technician: any;
  reviews: any[];
}

export function TechnicianProfile({ technician, reviews }: TechnicianProfileProps) {


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <div className="lg:col-span-2 space-y-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-background border border-secondary/20 p-6 rounded-2xl shadow-sm"
        >
          <div className="h-24 w-24 rounded-full bg-secondary/20 flex items-center justify-center text-primary text-3xl font-bold border-4 border-background shadow-md overflow-hidden">
            {technician?.user?.profileImg ? (
              <img src={technician.user.profileImg} alt={technician.user.name} className="h-full w-full object-cover" />
            ) : (
              technician?.user?.name?.charAt(0) || "T"
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-text">{technician?.user?.name}</h1>
              <BadgeCheck className="h-6 w-6 text-primary" />
            </div>
            <div className="text-primary font-medium mb-3 bg-primary/10 inline-block px-3 py-1 rounded-full text-sm">
              {technician?.category?.title} Professional
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text/70">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-bold text-text">{technician?.averageRating || 0}</span>
                <span>({technician?.reviewCount || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{technician?.user?.address || "Location not provided"}</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                <span>{technician.completedJobs} Jobs Completed</span>
              </div>
            </div>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-background border border-secondary/20 p-6 rounded-2xl shadow-sm"
        >
          <h2 className="text-xl font-bold text-text mb-4">About Me</h2>
          <p className="text-text/80 leading-relaxed">
            {technician.bio}
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background border border-secondary/20 p-6 rounded-2xl shadow-sm"
        >
          <h2 className="text-xl font-bold text-text mb-4">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {technician?.skills?.map((skill: string) => (
              <span key={skill} className="flex items-center gap-1 bg-secondary/10 text-text/80 px-4 py-2 rounded-lg text-sm border border-secondary/20">
                <Zap className="h-3 w-3 text-accent" />
                {skill}
              </span>
            ))}
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-background border border-secondary/20 p-6 rounded-2xl shadow-sm"
        >
          <h2 className="text-xl font-bold text-text mb-6">Past Reviews</h2>
          <div className="space-y-6">
            {reviews?.length > 0 ? (
              reviews.map((review: any) => (
                <div key={review.id} className="border-b border-secondary/20 last:border-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-text">{review?.customer?.name || "Customer"}</div>
                    <div className="text-xs text-text/50">{new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-secondary/30"}`}
                      />
                    ))}
                  </div>
                  <p className="text-text/70 text-sm leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))
            ) : (
              <p className="text-text/60 italic">No reviews yet.</p>
            )}
          </div>
        </motion.div>

      </div>


      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-1"
      >
        <BookingCalendar technicianId={technician.userId} />
      </motion.div>

    </div>
  );
}

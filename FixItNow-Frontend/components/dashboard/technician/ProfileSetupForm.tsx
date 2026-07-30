"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, Plus, X } from "lucide-react";

export function ProfileSetupForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [category, setCategory] = useState("Electrical");
  const [bio, setBio] = useState("With over 10 years of experience in residential and commercial electrical systems...");
  const [skills, setSkills] = useState(["Panel Upgrades", "Wiring", "Smart Home"]);
  const [newSkill, setNewSkill] = useState("");

  const categories = ["Plumbing", "Electrical", "Cleaning", "Appliance Repair", "Carpentry", "Painting"];

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile Updated", {
        description: "Your category and service details have been saved.",
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSave} className="bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm space-y-8">


      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text">Service Category</h3>
        <p className="text-sm text-text/60">Select the primary category you specialize in.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <label
              key={cat}
              className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${category === cat
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-secondary/30 bg-transparent text-text/70 hover:border-primary/50"
                }`}
            >
              <input
                type="radio"
                name="category"
                className="hidden"
                checked={category === cat}
                onChange={() => setCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-secondary/20" />

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text">About Me (Bio)</h3>
        <p className="text-sm text-text/60">Write a short description to tell customers about your experience.</p>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full bg-transparent border border-secondary/30 rounded-xl p-4 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          placeholder="Tell customers why they should hire you..."
          required
        />
      </div>

      <div className="h-px w-full bg-secondary/20" />

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text">Skills & Services</h3>
        <p className="text-sm text-text/60">List the specific services or skills you offer (e.g. "Pipe leak repair").</p>

        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
            placeholder="Add a new skill"
            className="bg-transparent border-secondary h-11 focus-visible:ring-primary"
          />
          <Button type="button" onClick={handleAddSkill} className="bg-secondary/20 text-text hover:bg-secondary/30 h-11 px-4">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map(skill => (
            <span key={skill} className="flex items-center gap-2 bg-secondary/10 text-text px-3 py-1.5 rounded-lg text-sm border border-secondary/20">
              {skill}
              <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-text/50 hover:text-accent">
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
          {skills.length === 0 && (
            <span className="text-sm text-text/50 italic">No skills added yet.</span>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={isSaving} className="w-full sm:w-auto bg-primary text-background hover:bg-primary/90 h-12 px-8 text-base font-semibold">
          {isSaving ? "Saving..." : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save Profile
            </>
          )}
        </Button>
      </div>

    </form>
  );
}

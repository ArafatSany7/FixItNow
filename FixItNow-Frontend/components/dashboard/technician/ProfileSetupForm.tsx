"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, Plus, X } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ProfileSetupForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<{ id: string, title: string }[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState(1);
  const [pricing, setPricing] = useState(50);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("accessToken");

        const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/categories`, {
          cache: 'no-store'
        });
        const catData = await catRes.json();
        let defaultCategoryId = "";
        if (catData.data) {
          setCategories(catData.data);
          if (catData.data.length > 0) {
            defaultCategoryId = catData.data[0].id;
          }
        }

        if (token) {
          const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/users/profile`, {
            headers: { Authorization: token },
            cache: 'no-store'
          });
          const profileData = await profileRes.json();
          if (profileData.data) {
            const user = profileData.data;
            if (user.profileImg) setProfileImg(user.profileImg);

            if (user.technicianProfile) {
              const tech = user.technicianProfile;
              setCategoryId(tech.categoryId || defaultCategoryId);
              setBio(tech.bio || "");
              setExperience(tech.experience || 1);
              setPricing(tech.pricing || 50);
              setSkills(tech.skills || []);
            } else {
              setCategoryId(defaultCategoryId);
            }
          }
        } else {
          setCategoryId(defaultCategoryId);
        }
      } catch (error) {
        console.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large", { description: "Please upload an image smaller than 5MB" });
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    setIsSaving(true);
    const token = Cookies.get("accessToken");
    const payload = {
      categoryId,
      skills,
      experience: Number(experience),
      pricing: Number(pricing)
    };

    try {

      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/technicians/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 400 || res.status === 409) {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/technicians/profile`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || '',
          },
          body: JSON.stringify({
            skills,
            experience: Number(experience),
            pricing: Number(pricing)
          })
        });
      }

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      toast.success("Profile Updated", {
        description: "Your service details have been saved.",
      });


      let finalProfileImg = profileImg;

      if (selectedFile) {
        toast.info("Uploading image to Cloudinary...", { id: "uploading-image" });
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'fixitnow');

        try {
          const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'}/image/upload`, {
            method: 'POST',
            body: formData
          });
          const uploadData = await uploadRes.json();
          if (uploadData.secure_url) {
            finalProfileImg = uploadData.secure_url;
            toast.dismiss("uploading-image");
          } else {
            toast.error("Cloudinary upload failed", { id: "uploading-image" });
          }
        } catch (e) {
          toast.error("Failed to upload to Cloudinary", { id: "uploading-image" });
        }
      }

      if (finalProfileImg) {
        const imgRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/users/profile`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || '',
          },
          body: JSON.stringify({ profileImg: finalProfileImg })
        });

        if (!imgRes.ok) {
          toast.error("Profile saved, but picture failed to upload to backend. Try an image URL.");
        }
      }

      router.refresh();

    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to update profile",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm space-y-8">

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text">Profile Picture</h3>
        <p className="text-sm text-text/60">Upload a picture (JPG/PNG) or provide a URL.</p>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {profileImg && (
            <div className="relative h-16 w-16 shrink-0 rounded-full bg-secondary/20 border-2 border-primary overflow-hidden">
              <Image src={profileImg} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <div className="flex-1 space-y-3 w-full">
            <Input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
              className="bg-transparent border-secondary/30 cursor-pointer"
            />
            <Input
              type="url"
              value={profileImg.startsWith("data:") ? "" : profileImg}
              onChange={(e) => setProfileImg(e.target.value)}
              placeholder="Or paste an image URL here..."
              className="bg-transparent border-secondary/30"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text">Service Category</h3>
        <p className="text-sm text-text/60">Select the primary category you specialize in.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${categoryId === cat.id
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-secondary/30 bg-transparent text-text/70 hover:border-primary/50"
                }`}
            >
              <input
                type="radio"
                name="category"
                className="hidden"
                checked={categoryId === cat.id}
                onChange={() => setCategoryId(cat.id)}
              />
              {cat.title}
            </label>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-secondary/20" />

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-text">Experience & Pricing</h3>
        <p className="text-sm text-text/60">Set your professional experience and base hourly pricing.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text/70 mb-1">Years of Experience</label>
            <Input
              type="number"
              min="0"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="bg-transparent border-secondary/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-text/70 mb-1">Base Pricing (Hourly $)</label>
            <Input
              type="number"
              min="0"
              value={pricing}
              onChange={(e) => setPricing(Number(e.target.value))}
              className="bg-transparent border-secondary/30"
              required
            />
          </div>
        </div>
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

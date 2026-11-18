import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISocialLink {
  name: string;
  icon: string;
  href: string;
  color: string;
}

export interface IContact extends Document {
  title: string;
  titleHighlight: string;
  description: string;
  footerNote: string;
  socialLinks: ISocialLink[];
}

const SocialLinkSchema = new Schema<ISocialLink>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  href: { type: String, required: true },
  color: { type: String, default: 'hover:text-purple-400' },
});

const ContactSchema = new Schema<IContact>(
  {
    title: { type: String, default: "Let's" },
    titleHighlight: { type: String, default: 'Connect' },
    description: {
      type: String,
      default:
        "Got a project in mind? Want to collaborate? Or just want to say hi? I'm just one message away",
    },
    footerNote: {
      type: String,
      default:
        'Currently open for freelance & interesting opportunities\n(React • Next.js • TypeScript • UI/UX)',
    },
    socialLinks: { type: [SocialLinkSchema], default: [] },
  },
  { timestamps: true }
);

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

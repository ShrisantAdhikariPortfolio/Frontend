import { connectDB } from '@/lib/mongodb';
import { Contact } from '@/models/Contact';
import { readFallbackData, writeFallbackData } from '@/lib/fileFallback';
import { ContactData } from '@/types/portfolio';

const defaultContact: ContactData = {
  title: "Let's",
  titleHighlight: 'Connect',
  description:
    "Got a project in mind? Want to collaborate? Or just want to say hi? I'm just one message away",
  footerNote:
    'Currently open for freelance & interesting opportunities\n(React • Next.js • TypeScript • UI/UX)',
  socialLinks: [
    {
      id: '1',
      name: 'GitHub',
      icon: 'Github',
      href: 'https://github.com/shreesantgithuber?tab=repositories',
      color: 'hover:text-gray-100',
    },
    {
      id: '2',
      name: 'LinkedIn',
      icon: 'Linkedin',
      href: 'https://np.linkedin.com/in/shreesant-adhikari-bb667322b',
      color: 'hover:text-blue-400',
    },
    {
      id: '3',
      name: 'Twitter / X',
      icon: 'Twitter',
      href: 'https://x.com/ShreesantAdhik2',
      color: 'hover:text-sky-400',
    },
    {
      id: '4',
      name: 'Instagram',
      icon: 'Instagram',
      href: 'https://www.instagram.com/css_loverss/?igsh=MWYybnVqanQzM2ptYQ%3D%3D#',
      color: 'hover:text-pink-500',
    },
    {
      id: '5',
      name: 'Email',
      icon: 'Mail',
      href: 'mailto:shreesantadhikari4590@gmail.com',
      color: 'hover:text-purple-400',
    },
    {
      id: '6',
      name: 'Website',
      icon: 'Globe',
      href: 'https://shrisant-academy-frontend.vercel.app/',
      color: 'hover:text-emerald-400',
    },
  ],
};

export async function getContact(): Promise<ContactData> {
  const fallback = readFallbackData<ContactData>('contact.json', defaultContact);

  try {
    const conn = await connectDB();
    if (!conn) {
      return fallback;
    }

    let doc = await Contact.findOne().lean();
    if (!doc) {
      const created = await Contact.create(fallback);
      return {
        title: created.title,
        titleHighlight: created.titleHighlight,
        description: created.description,
        footerNote: created.footerNote,
        socialLinks: created.socialLinks.map((s: any) => ({
          id: s._id ? s._id.toString() : s.id || s.name,
          name: s.name,
          icon: s.icon,
          href: s.href,
          color: s.color,
        })),
      };
    }

    return {
      title: doc.title || fallback.title,
      titleHighlight: doc.titleHighlight || fallback.titleHighlight,
      description: doc.description || fallback.description,
      footerNote: doc.footerNote || fallback.footerNote,
      socialLinks:
        doc.socialLinks && doc.socialLinks.length > 0
          ? doc.socialLinks.map((s: any) => ({
              id: s._id ? s._id.toString() : s.id || s.name,
              name: s.name,
              icon: s.icon,
              href: s.href,
              color: s.color,
            }))
          : fallback.socialLinks,
    };
  } catch (err) {
    console.error('getContact error:', err);
    return fallback;
  }
}

export async function updateContact(
  data: Partial<ContactData>
): Promise<ContactData> {
  const fallback = readFallbackData<ContactData>('contact.json', defaultContact);
  const updated: ContactData = {
    ...fallback,
    ...data,
  };
  writeFallbackData('contact.json', updated);

  try {
    const conn = await connectDB();
    if (conn) {
      const doc = await Contact.findOneAndUpdate(
        {},
        { $set: updated },
        { upsert: true, new: true }
      ).lean();

      return {
        title: doc.title,
        titleHighlight: doc.titleHighlight,
        description: doc.description,
        footerNote: doc.footerNote,
        socialLinks: doc.socialLinks.map((s: any) => ({
          id: s._id ? s._id.toString() : s.id || s.name,
          name: s.name,
          icon: s.icon,
          href: s.href,
          color: s.color,
        })),
      };
    }
  } catch (err) {
    console.error('updateContact error in MongoDB:', err);
  }

  return updated;
}

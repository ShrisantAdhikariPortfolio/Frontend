'use client';

import { useState, useEffect } from 'react';
import {
  HeroData,
  Project,
  ExperienceItem,
  EducationData,
  ContactData,
  BlogPost,
} from '@/types/portfolio';

export function useHero(fallback: HeroData) {
  const [data, setData] = useState<HeroData>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/hero')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.warn('Could not fetch hero from API:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading };
}

export function useProjects(fallback: Project[], featuredOnly = false) {
  const [data, setData] = useState<Project[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/projects${featuredOnly ? '?featured=true' : ''}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setData(json.data);
        }
      })
      .catch((err) => console.warn('Could not fetch projects from API:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [featuredOnly]);

  return { data, loading };
}

export function useExperience(fallback: ExperienceItem[]) {
  const [data, setData] = useState<ExperienceItem[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/experience')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setData(json.data);
        }
      })
      .catch((err) => console.warn('Could not fetch experience from API:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading };
}

export function useEducation(fallback: EducationData) {
  const [data, setData] = useState<EducationData>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/education')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.warn('Could not fetch education from API:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading };
}

export function useContact(fallback: ContactData) {
  const [data, setData] = useState<ContactData>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/contact')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.warn('Could not fetch contact from API:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading };
}

export function useBlogs(fallback: BlogPost[]) {
  const [data, setData] = useState<BlogPost[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/blogs')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setData(json.data);
        }
      })
      .catch((err) => console.warn('Could not fetch blogs from API:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading };
}

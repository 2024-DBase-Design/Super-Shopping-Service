'use client';
import useRoleAuth from '@/hooks/useRoleAuth';
import React from 'react';

export default function Page() {
  useRoleAuth(['customer'], '/login');

  return <h1>Hello, Next.js!</h1>;
}

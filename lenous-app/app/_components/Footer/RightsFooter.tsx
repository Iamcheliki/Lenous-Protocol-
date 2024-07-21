import React from 'react';
import Link from 'next/link';

export default function RightsFooter() {
  return (
    <div className="flex container justify-between mt-32 pb-8 text-body-text-dark">
      <div>© 2024 Lenous. All rights reserved.</div>
      <div className="flex gap-6">
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms of Service</Link>
        <Link href="#">Cookies Settings</Link>
      </div>
    </div>
  );
}

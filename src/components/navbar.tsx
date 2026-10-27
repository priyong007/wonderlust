'use client';

import * as React from 'react';
import Image from 'next/image';
import { Menu, UserRound, X } from 'lucide-react';
import { cn } from 'cn';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';

const links = [
  { label: 'Home', href: '/', active: true },
  { label: 'Destinations', href: '/destination' },
  { label: 'Add Destinations', href: '/add-destination' },
  { label: 'My Bookings', href: '/my-booking' },
  { label: 'Admin', href: '#admin' },
];

function linkClass(active?: boolean) {
  return cn(
    'rounded-md px-2 py-1.5 text-foreground/75 transition-colors hover:text-brand',
    active && 'bg-brand/10 text-brand',
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  const { data: session } = authClient.useSession();

  const user = session?.user;
  console.log(user);

  const handleSignout = () => {
    authClient.signOut();
  };

  return (
    <div className="">
      <header className="max-w-7xl mx-auto sticky top-0 z-40 border-b border-border/60 bg-background">
        <div className="relative mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
          <nav
            aria-label="Main"
            className="hidden items-center text-[13px] font-medium md:flex"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={link.active ? 'page' : undefined}
                className={linkClass(link.active)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#"
            className="flex items-center md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <Image
              src="/images/Wanderlast.png"
              alt="Wanderlast"
              width={162}
              height={24}
              priority
              className="h-4 w-auto lg:h-5"
            />
          </a>

          <div className="flex items-center justify-end gap-3 text-sm sm:gap-5">
            <Link
              href="#profile"
              className="hidden items-center gap-1.5 text-foreground/75 transition-colors hover:text-brand sm:flex"
            >
              <UserRound className="size-4" aria-hidden="true" />
              Profile
            </Link>

            {
              user ? <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage src={user?.image as string} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user?.email}</p>
                    <button
                      onClick={handleSignout}
                      className="btn bg-blue-300 rounded-sm py-1 px-2"
                    >
                      Sign Out
                    </button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover> : <>
            <Link
              href="/login"
              className="text-foreground/75 transition-colors hover:text-brand"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="font-semibold text-foreground transition-colors hover:text-brand"
            >
              Sign Up
            </Link>
            </>
            }

            
            
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 flex size-9 items-center justify-center rounded-md text-foreground/75 transition-colors hover:bg-muted md:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="flex flex-col gap-1 border-t border-border/60 px-4 py-2 text-sm font-medium md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={link.active ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={linkClass(link.active)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </div>
  );
}

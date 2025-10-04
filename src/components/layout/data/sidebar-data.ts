import {
  IconHome,
  IconUsers,
  IconShoppingBag,
  IconPercentage,
  IconShoppingCart,
  IconTrendingUp,
  IconBuilding,
  IconSettings,
  IconHelp,
  IconPlus,
  IconBrandWhatsapp,
  IconNetwork,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'reoring',
    email: 'reoring@gmail.com',
    avatar: '/avatars/default.svg',
  },
  teams: [
    {
      name: 'Next Shadcn Admin',
      logo: Command,
      plan: 'Next.js + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: '',
      items: [
        {
          title: 'Home',
          url: '/',
          icon: IconHome,
        },
        {
          title: 'Parties',
          icon: IconUsers,
          items: [
            {
              title: 'Party Details',
              url: '/parties',
              icon: IconPlus,
            },
            {
              title: 'Whatsapp Connect',
              url: '/parties/whatsapp',
              icon: IconBrandWhatsapp,
            },
            {
              title: 'Vyapar Network',
              url: '/parties/network',
              icon: IconNetwork,
            },
          ],
        },
        {
          title: 'Items',
          url: '/items',
          icon: IconShoppingBag,
          badge: '+',
        },
        {
          title: 'Sale',
          url: '/sale',
          icon: IconPercentage,
        },
        {
          title: 'Purchase & Expense',
          url: '/purchase',
          icon: IconShoppingCart,
        },
        {
          title: 'Grow Your Business',
          url: '/grow',
          icon: IconTrendingUp,
        },
        {
          title: 'Cash & Bank',
          url: '/cash-bank',
          icon: IconBuilding,
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: IconSettings,
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}

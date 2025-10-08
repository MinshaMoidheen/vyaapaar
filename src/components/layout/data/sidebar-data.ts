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
  IconChartBar,
  IconReceipt,
  IconCalendar,
  IconFileText,
  IconTrendingDown,
  IconCash,
  IconScale,
  IconReportAnalytics,
  IconUser,
  IconUsersGroup,
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
              title: 'WhatsApp Connect',
              url: '/parties/whatsapp-connect',
              icon: IconBrandWhatsapp,
            },
            {
              title: 'Vyapar Network',
              url: '/parties/vyapar-network',
              icon: IconNetwork,
            },
          ],
        },
        {
          title: 'Items',
          url: '/items',
          icon: IconShoppingBag,
          // badge: '+',
        },
        {
          title: 'Sale',
          icon: IconPercentage,
          items: [
            {
              title: 'Sale Invoices',
              url: '/sales',
              
            },
            {
              title: 'Estimate/ Quotation',
              url: '/sales/estimates',
              
            },
            {
              title: 'Proforma Invoice',
              url: '/sales/proforma',
            },
            {
              title: 'Payment-In',
              url: '/sales/payment-in',
              
            },
            {
              title: 'Sale Order',
              url: '/sales/order',
              // icon: IconPlus,
            },
            {
              title: 'Delivery Challan',
              url: '/sales/delivery-challan',
              
            },
            {
              title: 'Sale Return/ Credit Note',
              url: '/sales/sale-return',
             
            },
          ],
        },
        {
          title: 'Purchase & Exp..',
          icon: IconShoppingCart,
          items: [
            {
              title: 'Purchase Bills',
              url: '/purchase/bills',
              
            },
            {
              title: 'Payment-Out',
              url: '/purchase/payment-out',
             
            },
            {
              title: 'Expenses',
              url: '/purchase/expenses',
              
            },
            {
              title: 'Purchase Order',
              url: '/purchase/order',
              
            },
            {
              title: 'Purchase Return/ Dr. Note',
              url: '/purchase/return',
              
            },
          ],
        },
        {
          title: 'Grow Your Business',
          url: '/grow',
          icon: IconTrendingUp,
        },
        {
          title: 'Cash & Bank',
          icon: IconBuilding,
          items: [
            {
              title: 'Bank Accounts',
              url: '/cash-bank/bank-accounts',
            },
            {
              title: 'Cash In Hand',
              url: '/cash-bank/cash-in-hand',
            },
            {
              title: 'Cheques',
              url: '/cash-bank/cheques',
            },
            {
              title: 'Loan Accounts',
              url: '/cash-bank/loan-accounts',
            },
          ],
        },
        // {
        //   title: 'Reports',
        //   icon: IconChartBar,
        //   items: [
        //     {
        //       title: 'Sale',
        //       url: '/reports/sale',
        //       icon: IconReceipt,
        //     },
        //     {
        //       title: 'Purchase',
        //       url: '/reports/purchase',
        //       icon: IconShoppingCart,
        //     },
        //     {
        //       title: 'Day book',
        //       url: '/reports/day-book',
        //       icon: IconCalendar,
        //     },
        //     {
        //       title: 'All Transactions',
        //       url: '/reports/all-transactions',
        //       icon: IconFileText,
        //     },
        //     {
        //       title: 'Profit And Loss',
        //       url: '/reports/profit-loss',
        //       icon: IconTrendingUp,
        //     },
        //     {
        //       title: 'Bill Wise Profit',
        //       url: '/reports/bill-wise-profit',
        //       icon: IconReceipt,
        //     },
        //     {
        //       title: 'Cash flow',
        //       url: '/reports/cash-flow',
        //       icon: IconCash,
        //     },
        //     {
        //       title: 'Trial Balance Report',
        //       url: '/reports/trial-balance',
        //       icon: IconScale,
        //       badge: '•',
        //     },
        //     {
        //       title: 'Balance Sheet',
        //       url: '/reports/balance-sheet',
        //       icon: IconReportAnalytics,
        //     },
        //     {
        //       title: 'Party Statement',
        //       url: '/reports/party-statement',
        //       icon: IconUser,
        //     },
        //     {
        //       title: 'Party wise Profit & Loss',
        //       url: '/reports/party-profit-loss',
        //       icon: IconTrendingDown,
        //     },
        //     {
        //       title: 'All parties',
        //       url: '/reports/all-parties',
        //       icon: IconUsersGroup,
        //     },
        //     {
        //       title: 'Party Report By Item',
        //       url: '/reports/party-report-by-item',
        //       icon: IconFileText,
        //     },
        //     {
        //       title: 'Sale Purchase By Party',
        //       url: '/reports/sale-purchase-by-party',
        //       icon: IconUser,
        //     },
        //     {
        //       title: 'Sale Purchase By Party Group',
        //       url: '/reports/sale-purchase-by-party-group',
        //       icon: IconUsersGroup,
        //     },
        //   ],
        // },
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

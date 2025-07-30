# 🚀 Crypto Trading Dashboard

A modern, responsive cryptocurrency trading dashboard built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Wagmi** for Web3 wallet integration. Features real-time cryptocurrency data, wallet connection, message signing, and BNB balance display.

![Project Preview](https://via.placeholder.com/800x400/47fc28/000000?text=Crypto+Trading+Dashboard)

## ✨ Features

### 🏠 **Homepage Dashboard**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Dark theme with green accent colors (#47fc28)
- **Sticky Header**: Navigation stays visible while scrolling
- **Multi-section Layout**: Header, Main Content, Token List sections

### 📊 **Live Cryptocurrency Data**
- **Real-time API Integration**: Powered by CoinGecko API
- **Top 10 Cryptocurrencies**: Market cap, price, 24h changes
- **Responsive Table**: Mobile-optimized with horizontal scroll
- **Progressive Column Display**: Adaptive columns based on screen size
- **Auto-refresh Data**: Live price updates and market data

### 🔗 **Web3 Wallet Integration**
- **Multi-wallet Support**: MetaMask, Injected wallets
- **Network Support**: Ethereum Mainnet, Sepolia Testnet, BSC Mainnet
- **Message Signing**: Address verification with timestamp
- **Balance Display**: Real-time BNB balance on BSC network
- **Network Switching**: One-click BSC network switching

### 🎨 **Design System**
- **Custom CSS Variables**: Centralized color theming
- **Responsive Components**: Mobile, tablet, desktop optimized
- **Consistent Styling**: Reusable UI components
- **Modern Animations**: Smooth transitions and hover effects

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS v4, CSS Variables |
| **Web3** | Wagmi v2, Viem, TanStack React Query |
| **UI Components** | Radix UI, Lucide React Icons |
| **API** | CoinGecko REST API |
| **Development** | ESLint, Turbopack |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm** 10+
- **Web3 Wallet** (MetaMask)
- **Optional**: WalletConnect Project ID

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)
   ```bash
   cp .env.example .env.local
   ```
   Add your WalletConnect Project ID:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3010`

## 📁 Project Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Homepage
├── components/                   # Reusable UI components
│   ├── providers/
│   │   └── WagmiProvider.tsx    # Web3 provider setup
│   ├── ui/                      # Base UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── table.tsx
│   └── WalletConnect.tsx        # Main wallet component
├── screens/Design/              # Page sections
│   └── sections/
│       ├── HeaderSection/       # Navigation header
│       ├── MainContentSection/  # Token table
│       └── TokenListSection/    # Hero section
├── hooks/                       # Custom React hooks
│   └── useWalletStatus.ts       # Wallet state management
├── lib/                         # Configuration & utilities
│   ├── utils.ts                 # Utility functions
│   └── wagmi.ts                 # Web3 configuration
└── next.config.ts               # Next.js configuration
```

## 🎯 Component Architecture

### **WalletConnect Component**
The main wallet management component featuring:

```typescript
// Key features
- Multi-wallet connector support
- Message signing for address verification
- BNB balance display on BSC network
- Network switching functionality
- Responsive dropdown menu
- Error handling and loading states
```

### **MainContentSection Component**
Real-time cryptocurrency data table:

```typescript
// Features
- CoinGecko API integration
- Responsive table design
- Loading and error states
- Mobile-optimized columns
- Buy token integration
```

### **CSS Variables System**
Centralized theming with custom variables:

```css
:root {
  --primary: #47fc28;
  --primary-hover: #3be01f;
  --bg-header: rgba(0, 0, 0, 0.5);
  --text-success: #58c16d;
  /* ... more variables */
}
```

## 🔧 Configuration

### **Wagmi Configuration** (`lib/wagmi.ts`)
```typescript
export const config = createConfig({
  chains: [mainnet, sepolia, bsc],
  connectors: [injected(), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
})
```

### **Tailwind Configuration** (`globals.css`)
```css
@theme inline {
  --color-primary: var(--primary);
  --color-bg-header: var(--bg-header);
  /* CSS variables mapped to Tailwind */
}
```

## 🌐 API Integration

### **CoinGecko API**
```typescript
// Endpoint used
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets'
const params = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 10,
  page: 1,
  sparkline: false
}
```

### **Data Structure**
```typescript
interface Token {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
  total_volume: number
  image: string
}
```

## 🎨 Design System

### **Color Palette**
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#47fc28` | Buttons, highlights, logos |
| Primary Hover | `#3be01f` | Button hover states |
| Secondary | `#00c727` | Table headers, secondary text |
| Success | `#58c16d` | Positive changes, success states |
| Background | `rgba(0,0,0,0.5)` | Header, overlays |

### **Typography**
- **Primary Font**: Geist Sans (Google Fonts)
- **Mono Font**: Geist Mono (Google Fonts)
- **Fallback**: Arial, Helvetica, sans-serif

### **Responsive Breakpoints**
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

## 🔐 Web3 Integration

### **Wallet Connection Flow**
1. **Connect Wallet** → User selects MetaMask/Injected wallet
2. **Sign Message** → Verification with timestamped message
3. **Network Check** → Auto-detect or switch to BSC
4. **Balance Display** → Show BNB balance in header
5. **Transaction Ready** → Enable "Buy Token" functionality

### **Message Signing Format**
```
Sign to verify your address: 0x...
Timestamp: 2024-07-30T...
```

### **Supported Networks**
- **Ethereum Mainnet** (Chain ID: 1)
- **Sepolia Testnet** (Chain ID: 11155111)
- **BSC Mainnet** (Chain ID: 56)

## 📱 Mobile Responsiveness

### **Header Section**
- Responsive logo sizing
- Mobile-optimized wallet button
- Sticky positioning with z-index management

### **Token Table**
- **Mobile**: Shows Rank, Name, Price, Action only
- **Tablet**: Adds Market Cap column
- **Desktop**: Shows all columns (Volume, Supply)
- **Horizontal Scroll**: Maintains table structure on small screens

### **Wallet Dropdown**
- **Mobile**: Full-width dropdown with touch-friendly buttons
- **Desktop**: Positioned dropdown with hover effects
- **Responsive**: Adapts content based on screen size

## 🧪 Development

### **Available Scripts**
```bash
npm run dev      # Start development server (port 3010)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### **Development Features**
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Turbopack**: Fast development builds

### **Environment Variables**
```env
# Optional - for WalletConnect support
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Automatically handled
NEXT_PUBLIC_VERCEL_URL=your_deployment_url
```

## 🚀 Deployment


### **Manual Build**
```bash
npm run build
npm run start
```

### **Environment Setup**
1. Set up environment variables in your deployment platform
2. Ensure Next.js image domains are configured for:
   - `coin-images.coingecko.com`
   - `c.animaapp.com`

## 🔍 Troubleshooting

### **Common Issues**

**Wallet Connection Fails**
- Ensure MetaMask is installed and unlocked
- Check browser console for detailed errors
- Verify network connectivity

**API Data Not Loading**
- Check CoinGecko API status
- Verify network connection
- Review browser console for API errors

**Build Errors**
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

**Styling Issues**
- Verify Tailwind CSS is properly configured
- Check CSS variable definitions in `globals.css`
- Ensure responsive classes are applied correctly

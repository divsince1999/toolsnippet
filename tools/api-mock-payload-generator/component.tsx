"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const FIRST_NAMES = ["Emma", "Liam", "Olivia", "Noah", "Sophia", "Jackson", "Ava", "Lucas", "Mia", "Ethan"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson", "Taylor", "Anderson"];
const DOMAINS = ["example.com", "mail.dev", "company.io", "techhub.org"];
const ROLES = ["admin", "member", "editor", "viewer", "developer"];
const STATUSES = ["active", "pending", "suspended", "verified"];

export default function ApiMockPayloadGeneratorTool() {
  const [modelType, setModelType] = useState<"users" | "products" | "paginated">("users");
  const [count, setCount] = useState(5);
  const [seed, setSeed] = useState(1);

  const mockPayload = useMemo(() => {
    // Deterministic random helper with seed
    const pseudoRandom = (i: number, offset: number) => {
      const x = Math.sin(seed * 100 + i * 10 + offset) * 10000;
      return x - Math.floor(x);
    };

    if (modelType === "users") {
      const users = Array.from({ length: count }, (_, i) => {
        const fn = FIRST_NAMES[Math.floor(pseudoRandom(i, 1) * FIRST_NAMES.length)];
        const ln = LAST_NAMES[Math.floor(pseudoRandom(i, 2) * LAST_NAMES.length)];
        const dom = DOMAINS[Math.floor(pseudoRandom(i, 3) * DOMAINS.length)];
        const role = ROLES[Math.floor(pseudoRandom(i, 4) * ROLES.length)];
        const status = STATUSES[Math.floor(pseudoRandom(i, 5) * STATUSES.length)];

        return {
          id: `usr_${1000 + i}`,
          firstName: fn,
          lastName: ln,
          email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${dom}`,
          role: role,
          status: status,
          createdAt: new Date(1700000000000 + i * 86400000).toISOString(),
        };
      });

      return JSON.stringify(users, null, 2);
    }

    if (modelType === "products") {
      const products = Array.from({ length: count }, (_, i) => {
        const price = (pseudoRandom(i, 6) * 150 + 10).toFixed(2);
        const rating = (pseudoRandom(i, 7) * 2 + 3).toFixed(1);
        const stock = Math.floor(pseudoRandom(i, 8) * 250);

        return {
          id: `prod_${2000 + i}`,
          name: `Premium Developer Asset ${i + 1}`,
          sku: `SKU-${100 + i}-X`,
          price: Number(price),
          currency: "USD",
          rating: Number(rating),
          inStock: stock > 0,
          inventory: stock,
        };
      });

      return JSON.stringify(products, null, 2);
    }

    // Paginated REST response
    const items = Array.from({ length: count }, (_, i) => ({
      id: `item_${i + 1}`,
      title: `REST Record Entry #${i + 1}`,
      active: i % 2 === 0,
    }));

    return JSON.stringify(
      {
        status: 200,
        page: 1,
        perPage: count,
        totalCount: 150,
        totalPages: Math.ceil(150 / count),
        data: items,
      },
      null,
      2
    );
  }, [modelType, count, seed]);

  return (
    <ToolContainer
      title="API Mock Payload & Fake Data Generator"
      description="Generate mock JSON REST API responses for Users, Products, and Paginated datasets."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Data Entity Type
            </label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value as typeof modelType)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="users">Users / Customers (with Email & Roles)</option>
              <option value="products">E-Commerce Products (with SKU & Pricing)</option>
              <option value="paginated">Paginated API Response Envelope</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Items Count ({count} items)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value))))}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setSeed((prev) => prev + 1)}>🎲 Regenerate Random Seed</Button>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Mock JSON API Response"
            readOnly
            copyable
            value={mockPayload}
            rows={15}
          />
        </div>
      </div>
    </ToolContainer>
  );
}

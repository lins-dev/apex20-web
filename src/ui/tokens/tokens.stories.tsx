import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";

const meta: Meta = {
  title: "Design Tokens",
};

export default meta;

export const Colors: StoryObj = {
  render: () => (
    <div className="p-8 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Dark Mode (Base)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(colors.dark.bg).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div
                className="h-20 w-full rounded border border-white/10"
                style={{ backgroundColor: value }}
              />
              <div className="text-xs font-mono">{`bg-${key}`}</div>
              <div className="text-[10px] text-zinc-500 uppercase">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Accent & Text</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(colors.dark.accent).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="h-20 w-full rounded" style={{ backgroundColor: value }} />
              <div className="text-xs font-mono">{`accent-${key}`}</div>
              <div className="text-[10px] text-zinc-500 uppercase">{value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Font Sizes</h2>
        {Object.entries(typography.fontSize).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4 py-2 border-b border-zinc-800">
            <span className="w-20 text-xs font-mono text-zinc-500">{key}</span>
            <span style={{ fontSize: value }}>The quick brown fox jumps over the lazy dog.</span>
          </div>
        ))}
      </section>
    </div>
  ),
};

export const Spacing: StoryObj = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Spacing System</h2>
      <div className="space-y-4">
        {Object.entries(spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <span className="w-12 text-xs font-mono text-zinc-500">{key}</span>
            <div className="h-6 bg-primary" style={{ width: value }} />
            <span className="text-xs text-zinc-500">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

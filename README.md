# Nuxt 3 Pokédex - Challenge

A high-performance, responsive Pokédex application built with **Nuxt 3**, **TypeScript**, and **Nitro Server**. This project demonstrates modern frontend architecture, server-side data transformation, and enhanced UX patterns.

##  Key Features & Architectural Decisions
To go beyond the basic requirements, I implemented the following "Lead Engineer" improvements:

* **Optimized Nitro API (`/server/api/pokemon.ts`)**: Instead of fetching all data on the client, I built a server-side route that handles data mapping and parallel fetching using `Promise.all`. This reduces client-side overhead and ensures a faster Initial Page Load.
* **Dynamic Type-Based Theming**: Implemented a reactive CSS system where Pokémon cards automatically change their background and border colors based on the Pokémon's primary elemental type (Fire, Water, Grass, etc.).
* **Sticky Search Experience**: The search bar is locked to the top of the viewport (`position: sticky`), allowing for seamless filtering even when scrolling through large lists.
* **Data Sanitization & Formatting**:
    * Converted raw API units (decimeters to meters, hectograms to kilograms).
    * Formatted Pokémon IDs to standard 3-digit notation (e.g., #001).
    * Implemented title-case formatting for names and abilities.

##  Tech Stack
* **Framework**: Nuxt 3 (Vue 3 Composition API)
* **Language**: TypeScript
* **Server**: Nitro Engine
* **Styling**: Scoped CSS (Zero-dependency approach for a lightweight footprint)

## 🏁 Getting Started

### Installation
```bash
npm install

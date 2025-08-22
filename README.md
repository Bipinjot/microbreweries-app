# 🍺 Microbreweries Finder

A simple React app that fetches data from the [Open Brewery DB](https://api.openbrewerydb.org) and displays a list of **microbreweries** in a Material UI table.  
The app supports **searching, sorting, pagination, error handling, and loading states**.

---

## ✨ Features

- ✅ Fetches breweries from [Open Brewery DB](https://api.openbrewerydb.org/v1/breweries)  
- ✅ Filters to only show **microbreweries**  
- ✅ Search by **name or state**  
- ✅ Sortable table (by **name** and **state**)  
- ✅ Clickable website links (or "N/A" if missing)  
- ✅ Client-side pagination (5 rows per page)  
- ✅ Loading spinner while fetching data  
- ✅ Graceful error handling (with mock fallback data)  

---

## 🛠️ Tech Stack

- **React** (with Hooks: `useState`, `useEffect`, `useMemo`)  
- **Material UI (MUI)** for table, inputs, pagination, and styling  
- **JavaScript (ES6+)**  

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/microbreweries-finder.git
cd microbreweries-finder

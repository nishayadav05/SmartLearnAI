export const prioritySearch = (data, query, fields) => {
  const q = query.toLowerCase().trim();

  if (!q) return data;

  return data
    .map((item) => {
      let priority = 3;

      for (let field of fields) {
        const value = (item[field] || "").toString().toLowerCase();

        if (value.startsWith(q)) {
          priority = 0;
          break;
        } else if (value.includes(q)) {
          priority = Math.min(priority, 1);
        }
      }

      return { ...item, priority };
    })
    .filter((item) => item.priority < 2)
    .sort((a, b) => a.priority - b.priority);
};
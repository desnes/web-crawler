type FilterType = 'all' | 'long' | 'short'

interface FiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export const Filters = ({ currentFilter, onFilterChange }: FiltersProps) => {
  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'long', label: 'Long Titles' },
    { id: 'short', label: 'Short Titles' },
  ]

  return (
    <div className="flex space-x-2 mb-4">
      <span className="text-gray-700 font-medium">Filter by:</span>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentFilter === filter.id
              ? 'bg-hn-orange text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
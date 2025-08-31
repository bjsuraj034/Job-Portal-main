import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

// Filter options
const filterData = [
  {
    filterType: 'Location',
    array: ['Kathmandu', 'Pokhara', 'Butwal', 'Chitwan', 'Nepalgunj'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Job Type',
    array: ['remote', 'full-time', 'part-time'],
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const handleValueChange = (value) => {
    if (value !== selectedValue) setSelectedValue(value)
  }

  const handleMouseDown = (e, value) => {
    if (selectedValue === value) {
      e.preventDefault()
      setSelectedValue('')
    }
  }

  const clearFilters = () => setSelectedValue('')

  useEffect(() => {
    // Update the Redux state whenever selection changes
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue, dispatch])

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          disabled={!selectedValue}
        >
          Clear
        </Button>
      </div>
      <hr className="mt-3" />

      <RadioGroup
        value={selectedValue}
        onValueChange={handleValueChange}
        className="mt-3"
      >
        {filterData.map((group) => (
          <div key={group.filterType} className="my-3">
            <h2 className="font-semibold text-md">{group.filterType}</h2>
            {group.array.map((item, idx) => {
              const itemId = `${group.filterType}-${idx}`
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem
                    id={itemId}
                    value={item}
                    onMouseDown={(e) => handleMouseDown(e, item)}
                  />
                  <Label
                    htmlFor={itemId}
                    onMouseDown={(e) => handleMouseDown(e, item)}
                  >
                    {item}
                  </Label>
                </div>
              )
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard

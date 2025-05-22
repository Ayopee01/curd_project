import React, { useEffect, useState } from 'react'

function ProductManager() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || []
    setProducts(stored)
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddOrUpdate = () => {
    if (!form.name || !form.price) return

    const newProduct = { name: form.name, price: parseFloat(form.price) }

    if (editIndex !== null) {
      const updated = [...products]
      updated[editIndex] = newProduct
      setProducts(updated)
      setEditIndex(null)
    } else {
      setProducts([...products, newProduct])
    }

    setForm({ name: '', price: '' })
  }

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index)
    setProducts(updated)
  }

  const handleEdit = (index) => {
    const product = products[index]
    setForm(product)
    setEditIndex(index)
  }

  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPrice ? p.price <= parseFloat(filterPrice) : true)
    )

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">จัดการสินค้า</h2>

      <div className="space-x-2">
        <input type="text" name="name" placeholder="ชื่อสินค้า" value={form.name} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="price" placeholder="ราคา" value={form.price} onChange={handleChange} className="border p-2 rounded" />
        <button onClick={handleAddOrUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
          {editIndex !== null ? 'อัปเดต' : 'เพิ่ม'}
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        <input type="text" placeholder="ค้นหาชื่อ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 rounded w-1/2" />
        <input type="number" placeholder="กรองราคาสูงสุด" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} className="border p-2 rounded w-1/2" />
      </div>

      <ul className="divide-y border rounded">
        {displayedProducts.map((product, i) => (
          <li key={i} className="p-2 flex justify-between items-center">
            <div>{product.name} - ฿{product.price}</div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(i + (currentPage - 1) * itemsPerPage)} className="text-yellow-500">แก้ไข</button>
              <button onClick={() => handleDelete(i + (currentPage - 1) * itemsPerPage)} className="text-red-500">ลบ</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-2 py-1 border rounded">ก่อนหน้า</button>
        <span>หน้า {currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-2 py-1 border rounded">ถัดไป</button>
      </div>
    </div>
  )
}

export default ProductManager
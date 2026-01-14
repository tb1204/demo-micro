import React, { useEffect, useState } from 'react';

// Định nghĩa kiểu dữ liệu cho Sản phẩm
interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

// Định nghĩa kiểu dữ liệu cho Đơn hàng
interface Order {
  id: number;
  product: string;
  status: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Lấy Sản phẩm - Có try-catch riêng
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8080/products');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Product Service đang sập, nhưng không sao!");
        setProducts([]); // Nếu lỗi thì để danh sách rỗng, không làm đứng app
      }
    };

    // Lấy Đơn hàng - Có try-catch riêng
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:8080/orders');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Order Service đang sập!");
        setOrders([]);
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen space-y-16">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center">
        Hệ Thống Quản Lý Nội Thất
      </h1>

      {/* --- PHẦN SẢN PHẨM --- */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-8 border-blue-500 pl-4">
          Danh Mục Sản Phẩm (Product Service)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="flex flex-col p-4 bg-white shadow-md rounded-2xl hover:shadow-xl transition-all border border-gray-200">
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                <img 
                  src={p.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"} 
                  alt={p.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
                  <p className="text-blue-600 font-bold text-2xl mt-2">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.price)}
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Mua</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PHẦN ĐƠN HÀNG --- */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-8 border-green-500 pl-4">
          Lịch Sử Đơn Hàng (Order Service)
        </h2>
        <div className="overflow-hidden bg-white shadow rounded-2xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Đơn</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Sản Phẩm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(o => (
                <tr key={o.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{o.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{o.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${o.status === 'Đã giao' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default App;
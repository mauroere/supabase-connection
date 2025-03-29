import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ProductVariation {
  id: number;
  name: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  published: boolean;
  description: string;
  quantity: number;
  image: string;
  video?: string;
  variations: ProductVariation[];
}

interface InventoryManagerProps {
  products: Product[];
  updateProducts: (products: Product[]) => void;
}

export function InventoryManager({ products, updateProducts }: InventoryManagerProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    id: Date.now(),
    name: '',
    price: 0,
    published: false,
    description: '',
    quantity: 0,
    image: '',
    video: '',
    variations: [],
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setNewProduct({ ...newProduct, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const togglePublish = (id: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, published: !product.published } : product
    );
    updateProducts(updatedProducts);
    setSuccessMessage('Estado del producto actualizado con éxito.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0 || newProduct.quantity <= 0 || !newProduct.image) {
      setError('Por favor, completa todos los campos obligatorios (nombre, precio, cantidad e imagen).');
      return;
    }
    const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
    updateProducts(updatedProducts); // Actualizamos el contexto de productos
    setNewProduct({
      id: Date.now(),
      name: '',
      price: 0,
      published: false,
      description: '',
      quantity: 0,
      image: '',
      video: '',
      variations: [],
    });
    setError('');
    setSuccessMessage('Producto agregado con éxito.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditProduct = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setEditingProduct(product);
    }
  };

  const handleSaveEdit = () => {
    if (!editingProduct || !editingProduct.name || editingProduct.price <= 0 || editingProduct.quantity <= 0 || !editingProduct.image) {
      setError('Por favor, completa todos los campos obligatorios (nombre, precio, cantidad e imagen).');
      return;
    }
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    updateProducts(updatedProducts); // Actualizamos el contexto de productos
    setEditingProduct(null);
    setError('');
    setSuccessMessage('Producto actualizado con éxito.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const updatedProducts = products.filter((product) => product.id !== id);
      updateProducts(updatedProducts);
      setSuccessMessage('Producto eliminado con éxito.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleAddVariation = () => {
    if (!editingProduct) return;
    const newVariation = { id: Date.now(), name: '', value: '' };
    setEditingProduct({ ...editingProduct, variations: [...editingProduct.variations, newVariation] });
  };

  const handleUpdateVariation = (variationId: number, field: 'name' | 'value', value: string) => {
    if (!editingProduct) return;
    const updatedVariations = editingProduct.variations.map((variation) =>
      variation.id === variationId ? { ...variation, [field]: value } : variation
    );
    setEditingProduct({ ...editingProduct, variations: updatedVariations });
  };

  const handleDeleteVariation = (variationId: number) => {
    if (!editingProduct) return;
    const updatedVariations = editingProduct.variations.filter((variation) => variation.id !== variationId);
    setEditingProduct({ ...editingProduct, variations: updatedVariations });
  };

  const placeholderImage = 'https://via.placeholder.com/500x500?text=Vista+previa+no+disponible';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Inventario</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Agregar Nuevo Producto</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
            <input
              type="text"
              placeholder="Ingresa el nombre del producto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              placeholder="Ingresa el precio del producto"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              placeholder="Ingresa la cantidad disponible"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              placeholder="Ingresa una descripción del producto"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded px-4 py-6 text-center ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Suelta la imagen aquí...</p>
              ) : (
                <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una</p>
              )}
            </div>
            {newProduct.image ? (
              <img
                src={newProduct.image}
                alt="Vista previa"
                className="mt-4 w-32 h-32 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderImage;
                }}
              />
            ) : (
              <img
                src={placeholderImage}
                alt="Vista previa no disponible"
                className="mt-4 w-32 h-32 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL del Video (opcional)</label>
            <input
              type="text"
              placeholder="Ingresa la URL del video (opcional)"
              value={newProduct.video}
              onChange={(e) => setNewProduct({ ...newProduct, video: e.target.value })}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Agregar Producto
          </button>
        </div>
      </div>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Publicado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">${product.price.toFixed(2)}</td>
              <td className="px-4 py-2">{product.quantity}</td>
              <td className="px-4 py-2">{product.published ? 'Sí' : 'No'}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => togglePublish(product.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {product.published ? 'Despublicar' : 'Publicar'}
                </button>
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProduct && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Editar Producto</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
              }
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="number"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, quantity: parseInt(e.target.value) })
              }
              className="border rounded px-4 py-2 w-full"
            />
            <textarea
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              value={editingProduct.image}
              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              value={editingProduct.video}
              onChange={(e) => setEditingProduct({ ...editingProduct, video: e.target.value })}
              className="border rounded px-4 py-2 w-full"
            />
            <div>
              <h4 className="text-md font-semibold mb-2">Variaciones</h4>
              {editingProduct.variations.map((variation) => (
                <div key={variation.id} className="flex gap-4 mb-2">
                  <input
                    type="text"
                    placeholder="Nombre de la Variación"
                    value={variation.name}
                    onChange={(e) =>
                      handleUpdateVariation(variation.id, 'name', e.target.value)
                    }
                    className="border rounded px-4 py-2 w-1/2"
                  />
                  <input
                    type="text"
                    placeholder="Valor de la Variación"
                    value={variation.value}
                    onChange={(e) =>
                      handleUpdateVariation(variation.id, 'value', e.target.value)
                    }
                    className="border rounded px-4 py-2 w-1/2"
                  />
                  <button
                    onClick={() => handleDeleteVariation(variation.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddVariation}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Agregar Variación
              </button>
            </div>
            <button
              onClick={handleSaveEdit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

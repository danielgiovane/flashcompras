"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ShoppingCart, TrendingUp, Package, Star, ChevronDown, Menu, Phone, ChevronLeft, ChevronRight, Share2 } from 'lucide-react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const categories = [
  { name: "Eletrônicos", icon: <Zap className="h-8 w-8" />, color: "bg-purple-500" },
  { name: "Moda", icon: <ShoppingCart className="h-8 w-8 text-white" />, color: "bg-black" },
  { name: "Casa", icon: <Package className="h-8 w-8" />, color: "bg-white border border-gray-200" },
  { name: "Esportes", icon: <TrendingUp className="h-8 w-8" />, color: "bg-purple-200" },
]

const allProducts = [
  {
    id: 1, name: "Galaxy s24 ultra", price: "R$ 9.999", category: "Eletrônicos", media: [
      { type: "image", src: "/assets/img/g3.jpg" },
      { type: "image", src: "/assets/img/g2.avif" }
    ]
  },
  {
    id: 2, name: "Laptop Y", price: "R$ 3999,99", category: "Eletrônicos", media: [
      { type: "image", src: "/assets/img/gl1.jpg" },
      { type: "image", src: "/assets/img/gl2.jpg" }
    ]
  },
  {
    id: 3, name: "Camiseta A", price: "R$ 59,99", category: "Moda", media: [
      { type: "image", src: "/assets/img/c1.jpg" },
      { type: "image", src: "/placeholder.svg?height=400&width=600" }
    ]
  },
  {
    id: 4, name: "Calça B", price: "R$ 129,99", category: "Moda", media: [
      { type: "image", src: "/placeholder.svg?height=400&width=600" },
      { type: "video", src: "https://www.youtube.com/watch?v=e9qQpjqTjH4" }
    ]
  },
  {
    id: 5, name: "Sofá D", price: "R$ 1299,99", category: "Casa", media: [
      { type: "image", src: "/placeholder.svg?height=400&width=600" },
      { type: "image", src: "/placeholder.svg?height=400&width=600" }
    ]
  },
  {
    id: 6, name: "Mesa E", price: "R$ 799,99", category: "Casa", media: [
      { type: "image", src: "/placeholder.svg?height=400&width=600" },
      { type: "video", src: "https://example.com/table-video.mp4" }
    ]
  },
  {
    id: 7, name: "Bicicleta G", price: "R$ 899,99", category: "Esportes", media: [
      { type: "image", src: "/placeholder.svg?height=400&width=600" },
      { type: "video", src: "https://example.com/bicycle-video.mp4" }
    ]
  },
  {
    id: 8, name: "Raquete H", price: "R$ 249,99", category: "Esportes", media: [
      { type: "image", src: "/placeholder.svg?height=400&width=600" },
      { type: "image", src: "/placeholder.svg?height=400&width=600" }
    ]
  },
]

const testimonials = [
  { id: 1, name: "João Silva", comment: "Ótimos produtos e entrega rápida!", rating: 5 },
  { id: 2, name: "Maria Santos", comment: "Comprei o Laptop Y e estou muito satisfeita!", rating: 4 },
  { id: 3, name: "Pedro Oliveira", comment: "Atendimento excelente e produtos de qualidade.", rating: 5 },
  { id: 4, name: "Ana Rodrigues", comment: "Preços competitivos e grande variedade.", rating: 4 },
  { id: 5, name: "Carlos Ferreira", comment: "Experiência de compra fácil e rápida!", rating: 5 },
]

export function FlashCompraComponent() {
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentMediaIndex, setCurrentMediaIndex] = useState({})
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [visibleProducts, setVisibleProducts] = useState(4)
  const [redirectCountdown, setRedirectCountdown] = useState(3)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const featuredProducts = allProducts.slice(0, 3)
  const carouselRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    let timer
    if (isRedirecting && redirectCountdown > 0) {
      timer = setTimeout(() => setRedirectCountdown(redirectCountdown - 1), 1000)
    } else if (isRedirecting && redirectCountdown === 0) {
      window.open('https://example.com', '_blank')
      setIsRedirecting(false)
      setRedirectCountdown(3)
    }
    return () => clearTimeout(timer)
  }, [isRedirecting, redirectCountdown])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextMedia = (productId) => {
    setCurrentMediaIndex((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % allProducts.find(p => p.id === productId).media.length
    }))
  }

  const prevMedia = (productId) => {
    setCurrentMediaIndex((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + allProducts.find(p => p.id === productId).media.length) % allProducts.find(p => p.id === productId).media.length
    }))
  }

  const shareProduct = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Confira o ${product.name} por apenas ${product.price}!`,
        url: window.location.href,
      })
    } else {
      alert('Compartilhamento não suportado neste navegador.')
    }
  }

  const filteredProducts = selectedCategory === "Todos"
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-gray-600" />
            <h1 className="text-2xl font-bold ml-2 text-gray-800">FlashCompra</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#produtos" className="text-gray-600 hover:text-gray-800">Produtos</a></li>
              <li><a href="#ofertas" className="text-gray-600 hover:text-gray-800">Ofertas</a></li>
              <li><a href="#depoimentos" className="text-gray-600 hover:text-gray-800">Depoimentos</a></li>
            </ul>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="#produtos" className="text-gray-600 hover:text-gray-800">Produtos</a>
                <a href="#ofertas" className="text-gray-600 hover:text-gray-800">Ofertas</a>
                <a href="#depoimentos" className="text-gray-600 hover:text-gray-800">Depoimentos</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="ofertas" className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 md:w-1/3">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Compre.<br />Economize.<br />Aproveite.</h2>
                <p className="text-xl mb-6 text-gray-600">Encontre as melhores ofertas em um só lugar.</p>
                <Button className="bg-gray-800 text-white hover:bg-gray-700">
                  <a href="#produtos">Explorar Ofertas</a>
                </Button>
              </div>
              {isMobile ? (
                <div className="w-full overflow-x-auto" ref={carouselRef}>
                  <div className="flex">
                    {featuredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="flex-none w-[80vw] mr-4 last:mr-0"
                        style={{
                          scrollSnapAlign: 'start',
                        }}
                      >
                        <Image src={product.media[0].src} alt={product.name} width={600} height={400} className="w-full h-64 object-cover rounded-lg" />
                        <div className="mt-2">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p>{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full md:w-2/3 flex gap-4 h-96">
                  {featuredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="relative cursor-pointer rounded-lg overflow-hidden"
                      style={{
                        width: index === 0 ? '50%' : '25%',
                        flexShrink: 0,
                      }}
                      onHoverStart={() => setHoveredProduct(product.id)}
                      onHoverEnd={() => setHoveredProduct(null)}
                      animate={{
                        width: hoveredProduct === product.id ? '50%' :
                          hoveredProduct === null && index === 0 ? '50%' : '25%'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image src={product.media[0].src} alt={product.name} width={600} height={400} className="w-full h-full object-cover" />                      
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                        <p>{product.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Produtos em Destaque</h2>

            {/* Category Filter */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                className={`rounded-full w-12 h-12 flex items-center justify-center ${selectedCategory === "Todos" ? "ring-2 ring-offset-2 ring-gray-500" : ""
                  }`}
                onClick={() => setSelectedCategory("Todos")}
              >
                Todos
              </button>
              {categories.map((category) => (
                <div key={category.name} className="flex flex-col items-center">
                  <button
                    className={`rounded-full w-12 h-12 flex items-center justify-center ${category.color} ${selectedCategory === category.name ? "ring-2 ring-offset-2 ring-gray-500" : ""
                      }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.icon}
                  </button>
                  <span className="text-xs mt-1">{category.name}</span>
                </div>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <Card key={product.id}>
                  <CardHeader className="p-0">
                    <div className="relative">
                      {product.media[currentMediaIndex[product.id] || 0].type === 'image' ? (
                        <Image
                          src={product.media[currentMediaIndex[product.id] || 0].src}
                          alt={product.name}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      ) : (
                        <video
                          src={product.media[currentMediaIndex[product.id] || 0].src}
                          className="w-full h-48 object-cover rounded-t-lg"
                          autoPlay
                          loop
                          muted
                        />
                      )}
                      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 transform -translate-y-1/2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white bg-opacity-50 hover:bg-opacity-75"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevMedia(product.id);
                          }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white bg-opacity-50 hover:bg-opacity-75"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextMedia(product.id);
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mt-3">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-gray-800 text-white hover:bg-gray-700"
                          onClick={() => {
                            setIsRedirecting(true); // {{ edit_1 }} Inicia o redirecionamento ao clicar
                          }}
                        >
                          Comprar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogDescription className="text-center py-8">
                          <h3 className="text-2xl font-bold mb-4">Prepare-se para a compra!</h3>
                          <p className="text-lg mb-4">
                            Vamos direcionar você para a plataforma onde vendemos este produdo, em {redirectCountdown} {redirectCountdown === 1 ? 'segundo' : 'segundos'}.
                          </p>
                          <p className="text-sm text-gray-600">Obrigado por escolher a FlashCompra!</p>
                        </DialogDescription>
                        <Button
                          onClick={() => {
                            setIsRedirecting(true); // {{ edit_2 }} Mantém a funcionalidade de redirecionamento
                          }}
                          className="w-full"
                        >
                          Ir agora
                        </Button>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => shareProduct(product)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {visibleProducts < filteredProducts.length && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setVisibleProducts(prev => Math.min(prev + 4, filteredProducts.length))}
                  className="bg-gray-800 text-white hover:bg-gray-700"
                >
                  Ver Mais Produtos
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">O que nossos clientes dizem</h2>
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentTestimonial * 100}%` }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <Card className="mx-auto max-w-lg">
                        <CardHeader>
                          <CardTitle>{testimonial.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">"{testimonial.comment}"</p>
                          <div className="flex mt-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </motion.div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-semibold mb-4">FlashCompra</h3>
              <p className="text-sm">Compras rápidas, preços incríveis!</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Navegação</h3>
              <ul className="space-y-2">
                <li><a href="#produtos" className="text-sm hover:text-gray-300">Produtos</a></li>
                <li><a href="#ofertas" className="text-sm hover:text-gray-300">Ofertas</a></li>
                <li><a href="#depoimentos" className="text-sm hover:text-gray-300">Depoimentos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ajuda</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-gray-300">FAQ</a></li>
                <li><a href="#" className="text-sm hover:text-gray-300">Envio</a></li>
                <li><a href="#" className="text-sm hover:text-gray-300">Devoluções</a></li>
                <li><a href="#" className="text-sm hover:text-gray-300">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-sm text-center">
            <p>&copy; 2024 FlashCompra. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0 0 0 0 0 0c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
          />
        </svg>
      </a>
    </div>
  )
}
"use client"

import { servicesConfig, productsConfig } from "@/config/store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { siteConfig } from "@/config/site"
import { useState } from "react"

export default function Store() {
  const [showDialog, setShowDialog] = useState(false)

  const handleServiceClick = () => {
    window.open(siteConfig.links.kofi, "_blank")
  }

  const handleProductClick = () => {
    setShowDialog(true)
  }

  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
          Store
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Services and products available for purchase.
        </p>

        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Services</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {servicesConfig.map((service) => (
                <CarouselItem key={service.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <div className="relative aspect-video">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{service.title}</CardTitle>
                        <Badge variant="secondary">{service.price}</Badge>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="text-sm flex items-center">
                            <span className="mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleServiceClick} className="w-full">
                        Purchase Service
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <section>
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Products</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {productsConfig.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <div className="relative aspect-video">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{product.title}</CardTitle>
                        <Badge variant="secondary">{product.price}</Badge>
                      </div>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {product.features.map((feature, i) => (
                          <li key={i} className="text-sm flex items-center">
                            <span className="mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleProductClick} className="w-full">
                        Purchase Product
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Contact Me</AlertDialogTitle>
              <AlertDialogDescription>
                To purchase this product, please contact me on Discord at{" "}
                <strong>{siteConfig.links.discord}</strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

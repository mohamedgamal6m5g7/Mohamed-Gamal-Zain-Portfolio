"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react"
import type { Testimonial } from "@/lib/portfolio-data"

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

export function Testimonials({ testimonials = [] }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (testimonials.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-6">
            <Quote className="h-8 w-8 text-purple-500 dark:text-purple-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Testimonials & Recommendations
          </h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto text-lg">
            What colleagues and mentors say about my work and character
          </p>
          <div className="mt-12">
            <p className="text-gray-600 dark:text-gray-300">No testimonials found. Add testimonials through the admin panel.</p>
          </div>
        </div>
      </section>
    )
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-6">
            <Quote className="h-8 w-8 text-purple-500 dark:text-purple-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Testimonials & Recommendations
          </h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto text-lg">
            What colleagues and mentors say about my work and character
          </p>
        </div>

        <div className="relative">
          <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-6">
                  <Quote className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 italic mb-8 leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                    {currentTestimonial.image ? (
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8" />
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      {currentTestimonial.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {currentTestimonial.company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Relationship Badge */}
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                  {currentTestimonial.relationship}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-purple-500 dark:bg-purple-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Testimonial Counter */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentIndex + 1} of {testimonials.length}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Average Rating: {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}</span>
            </div>
            <div className="text-gray-300 dark:text-gray-600">|</div>
            <div>
              <span>{testimonials.length} Testimonials</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

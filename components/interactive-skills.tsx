"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Wrench, Cpu, Zap, Brain, Settings } from "lucide-react"
import type { SkillCategory } from "@/lib/portfolio-data"

// Icon mapping
const iconMap = {
  Code,
  Wrench,
  Cpu,
  Zap,
  Brain,
  Settings,
}

interface InteractiveSkillsProps {
  skillCategories?: SkillCategory[]
}

export function InteractiveSkills({ skillCategories = [] }: InteractiveSkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    if (skillCategories.length > 0) {
      setSelectedCategory(skillCategories[0].id)
    }
  }, [skillCategories])

  const getSkillLevel = (level: number) => {
    if (level >= 90) return { label: "Expert", color: "bg-green-500" }
    if (level >= 80) return { label: "Advanced", color: "bg-blue-500" }
    if (level >= 70) return { label: "Intermediate", color: "bg-yellow-500" }
    return { label: "Beginner", color: "bg-gray-500" }
  }

  if (skillCategories.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
              No skills data available
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Interactive visualization of my technical skills across different domains
          </p>
        </div>

        {/* Skill Categories Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex space-x-1">
            {skillCategories.map((category) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || Code
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${category.color}`} />
                  <span>{category.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || Code
            return (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${category.color}`} />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.skills.map((skill, index) => {
                        const skillInfo = getSkillLevel(skill.level)
                        return (
                          <div key={skill.id} className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{skill.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={skillInfo.color}>
                                  {skillInfo.label}
                                </Badge>
                                <span className="text-sm text-gray-600 dark:text-gray-300">{skill.projects} projects</span>
                              </div>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                            <div className="text-right text-sm text-gray-600 dark:text-gray-300">{skill.level}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}

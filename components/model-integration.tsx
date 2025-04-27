"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function ModelIntegration() {
  const [pythonOutput, setPythonOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const runModel = async () => {
    setIsRunning(true)
    setPythonOutput("Starting phishing detection model...\n")

    try {
      // In a real implementation, this would call an API endpoint that runs your Python model
      // For demonstration, we'll simulate the output
      await simulateModelOutput()
    } catch (error) {
      console.error("Error running model:", error)
      setPythonOutput((prev) => prev + "\nError: Failed to run the model.")
    } finally {
      setIsRunning(false)
    }
  }

  const simulateModelOutput = async () => {
    const outputs = [
      "Loading data...",
      "Extracting features from URL...",
      "Creating binary visualization...",
      "Analyzing binary patterns...",
      "Training machine learning models...",
      "Evaluating model performance...",
      "Classification Report:",
      "              precision    recall  f1-score   support",
      "           0       0.97      0.98      0.97       198",
      "           1       0.98      0.97      0.97       202",
      "    accuracy                           0.97       400",
      "   macro avg       0.97      0.97      0.97       400",
      "weighted avg       0.97      0.97      0.97       400",
      "",
      "Model training complete!",
    ]

    for (const output of outputs) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setPythonOutput((prev) => prev + output + "\n")
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">Model Console</CardTitle>
        <CardDescription className="text-slate-300">Run the phishing detection model</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={pythonOutput}
          readOnly
          className="font-mono text-sm h-[300px] bg-slate-900 text-emerald-400 border-slate-700"
        />

        <Button onClick={runModel} disabled={isRunning} className="w-full bg-emerald-500 hover:bg-emerald-600">
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Model...
            </>
          ) : (
            "Run Phishing Detection Model"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

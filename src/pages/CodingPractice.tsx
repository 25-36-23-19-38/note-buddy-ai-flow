import React, { useState } from 'react';
import { Code, Play, CheckCircle, Save, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const CodingPractice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your solution here\nfunction solve() {\n    \n}');
  const [question, setQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' }
  ];

  const runCode = () => {
    toast({
      title: "Code Running",
      description: "Executing your code against test cases...",
    });
  };

  const saveCode = () => {
    // Save code to local storage or backend
    localStorage.setItem(`code_${selectedLanguage}`, code);
    toast({
      title: "Code Saved",
      description: "Your code has been saved successfully!",
    });
  };

  const generateAnswer = async () => {
    if (!question.trim()) {
      toast({
        title: "No Question",
        description: "Please enter a question to generate an answer.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate AI response generation
      setTimeout(() => {
        const sampleAnswers = {
          javascript: `// AI-generated solution for: ${question}
function solution() {
    // Implementation based on your question
    console.log("Generated solution");
    return "result";
}

// Example usage
solution();`,
          python: `# AI-generated solution for: ${question}
def solution():
    # Implementation based on your question
    print("Generated solution")
    return "result"

# Example usage
solution()`,
          java: `// AI-generated solution for: ${question}
public class Solution {
    public static void main(String[] args) {
        // Implementation based on your question
        System.out.println("Generated solution");
    }
}`,
          cpp: `// AI-generated solution for: ${question}
#include <iostream>
using namespace std;

int main() {
    // Implementation based on your question
    cout << "Generated solution" << endl;
    return 0;
}`,
          csharp: `// AI-generated solution for: ${question}
using System;

class Program {
    static void Main() {
        // Implementation based on your question
        Console.WriteLine("Generated solution");
    }
}`
        };

        setCode(sampleAnswers[selectedLanguage as keyof typeof sampleAnswers] || sampleAnswers.javascript);
        setQuestion('');
        setIsGenerating(false);
        toast({
          title: "Answer Generated",
          description: "AI has generated a solution based on your question!",
        });
      }, 2000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: "Failed to generate answer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const submitCode = () => {
    toast({
      title: "Code Submitted",
      description: "Your solution has been submitted for evaluation!",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">Coding Practice</span>
        </h1>
        <p className="text-xl text-gray-600">
          Write and test your code with AI assistance.
        </p>
      </div>

      {/* Code Editor */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Code Editor
            </CardTitle>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Question Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Ask AI to generate code:
            </label>
            <div className="flex space-x-2">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., Write a function to find the maximum element in an array"
                className="flex-1"
                disabled={isGenerating}
              />
              <Button 
                onClick={generateAnswer} 
                disabled={isGenerating || !question.trim()}
                className="px-6"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Code Editor */}
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm min-h-[400px] resize-none"
            placeholder="Write your solution here..."
          />
          
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button onClick={saveCode} variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={runCode} variant="outline">
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
            <Button onClick={submitCode} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodingPractice;
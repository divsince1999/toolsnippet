"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function LoremIpsumGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [options, setOptions] = useState({
    paragraphs: 3,
    sentencesPerParagraph: 4,
    wordsPerSentence: 8,
    startWithLorem: true,
  });

  const generate = () => {
    try {
      const { paragraphs, sentencesPerParagraph, wordsPerSentence, startWithLorem } = options;
      
      const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
        'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis',
        'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat',
        'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
        'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
      ];
      
      const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
      const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
      
      const generateSentence = (isFirst: boolean = false) => {
        let sentence = [];
        
        if (isFirst && startWithLorem) {
          sentence.push('Lorem');
          sentence.push('ipsum');
          
          for (let i = 2; i < wordsPerSentence; i++) {
            sentence.push(getRandomWord());
          }
        } else {
          for (let i = 0; i < wordsPerSentence; i++) {
            sentence.push(getRandomWord());
          }
        }
        
        return capitalizeFirst(sentence.join(' ')) + '.';
      };
      
      const generateParagraph = (paragraphIndex: number) => {
        let paragraphSentences = [];
        
        for (let i = 0; i < sentencesPerParagraph; i++) {
          const isFirst = paragraphIndex === 0 && i === 0;
          paragraphSentences.push(generateSentence(isFirst));
        }
        
        return paragraphSentences.join(' ');
      };
      
      let result = [];
      for (let i = 0; i < paragraphs; i++) {
        result.push(generateParagraph(i));
      }
      
      setOutput(result.join('\n\n'));
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Generation failed"}`);
    }
  };

  const updateOption = (key: keyof typeof options, value: string | number | boolean) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ToolContainer title="Lorem Ipsum Generator" description="Generate placeholder text with customizable options.">
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Number of Paragraphs</label>
            <input
              type="number"
              min="1"
              max="10"
              value={options.paragraphs}
              onChange={(e) => updateOption("paragraphs", parseInt(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sentences per Paragraph</label>
            <input
              type="number"
              min="1"
              max="10"
              value={options.sentencesPerParagraph}
              onChange={(e) => updateOption("sentencesPerParagraph", parseInt(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Words per Sentence</label>
            <input
              type="number"
              min="3"
              max="20"
              value={options.wordsPerSentence}
              onChange={(e) => updateOption("wordsPerSentence", parseInt(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.startWithLorem}
                onChange={(e) => updateOption("startWithLorem", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Start with "Lorem ipsum"</span>
            </label>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={generate}>Generate</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>
        {output && <TextArea label="Generated Text" readOnly copyable value={output} rows={8} />}
      </div>
    </ToolContainer>
  );
}

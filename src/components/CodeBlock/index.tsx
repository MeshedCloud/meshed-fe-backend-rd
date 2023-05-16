import React, {useEffect, useRef, useState} from 'react';
import hljs from './highlight';

import 'highlight.js/styles/pojoaque.css'
import {clipboardWrite} from "@/common/copy";

export type CodeBlockProps = {
  codeKey: number | string
  language: string
  code?: string

};
const CodeBlock: React.FC<CodeBlockProps> = ({codeKey, language, code}) => {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  console.log(codeKey)
  useEffect(() => {
    if (preRef.current) {
      hljs.highlightBlock(preRef.current);
    }

    return () => {
    }
  }, [code]);

  return (
    <div key={codeKey} className="code-block" style={{position: 'relative', marginTop: 8, borderRadius: "5px"}}>
      <pre>
        <code id={language} ref={preRef} className={`${language}_${codeKey}`}>
          {code}
        </code>
      </pre>
      <button onClick={() => {
        clipboardWrite(code)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }} id={`${language}_${codeKey}copy_btn`}
              style={{position: 'absolute', top: 4, right: 4, lineHeight: '14px', opacity: 0.5, borderRadius: "5px"}}
              className="code-block__button" data-clipboard-target={`#${language}_${codeKey}`}
              disabled={!preRef.current}>
        {copied ? '已复制' : '复制'}
      </button>
    </div>
  );
}
//_${codeKey}

export default CodeBlock

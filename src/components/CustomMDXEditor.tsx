import React from 'react'
import { BoldItalicUnderlineToggles, CreateLink, InsertImage, ListsToggle, MDXEditor, MDXEditorMethods, Separator, UndoRedo, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, toolbarPlugin } from '@mdxeditor/editor'


// eslint-disable-next-line no-unused-vars
export function CustomMDXEditor({ onChangeFn }: { onChangeFn: (e: string) => void; }) {
   const ref = React.useRef<MDXEditorMethods>(null)
   // const [text, setText] = useState<string>()
   // console.log(text)
   return(
      <div className='w-full '>
         <MDXEditor 
            ref={ref} 
            onChange={(e) => {onChangeFn(e)}}
            markdown='Hello world' 
            plugins={[toolbarPlugin({
               toolbarContents: () => (<> <BoldItalicUnderlineToggles /> <Separator /> <ListsToggle /> <Separator /> <InsertImage /> <CreateLink /><UndoRedo />  </>)
            }), listsPlugin(), linkPlugin(), linkDialogPlugin(), imagePlugin()]}
            className=''
            contentEditableClassName="editor prose min-h-32 h-32 max-h-96 overflow-scroll bg-white border"
         />

      </div>

   )

}

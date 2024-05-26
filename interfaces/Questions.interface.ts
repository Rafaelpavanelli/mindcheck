export interface Question {
    id:number;
    question:string;
    type: 'text' | 'radio' | 'checkbox';
    options?: string[];
}
export interface QuestionFormProps {
    questions: Question[];
    onSubmit:(data:any)=> void;
    isLast?:boolean;
    nextPage: ()=>void;
    prevPage:()=>void
}
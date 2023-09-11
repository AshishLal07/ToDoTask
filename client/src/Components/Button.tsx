

type privateProp = {
    text:string,
    color:string,
    onToggle: () => void
}

const Button = ({onToggle,color,text}:privateProp) => {
  return (
    <div>
        <button 
          className="btn" 
          style={{backgroundColor:color }}
          onClick={onToggle}
        >{text}</button>
    </div>
  )
}

export default Button
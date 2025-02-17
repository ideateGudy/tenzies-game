export default function Die(props) {

const color = props.isheld ? '#59E391' : ''
	const styles = {backgroundColor: color}


    return (
	<button 
          style={styles} 
          onClick={props.onclick}
	  aria-pressed={props.isheld} 
          aria-label={`Button with value ${props.value},
	  ${props.isheld ? "Held" : "Not Held"}`} 
       >{props.value}</button>
)
}

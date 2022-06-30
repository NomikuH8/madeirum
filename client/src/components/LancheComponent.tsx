function LancheButton(props: any) {
  const lanche = props.lanche
  
  return (
    <div>
      <img src={lanche.foto_produto} alt="" />
      <span>{lanche.nome_produto}</span>
    </div>
  )
}

export default LancheButton
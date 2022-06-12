import { useParams } from "react-router"

function AdminLanches() {
  const { categoria } = useParams()

  return (
    <div>editando categoria {categoria}</div>
  )
}

export default AdminLanches
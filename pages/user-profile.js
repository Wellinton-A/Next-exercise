const UserProfile = (props) => {

  return <h1>{props.username}</h1>
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      username: 'Maximumamamam'
    }
  }
}

export default UserProfile
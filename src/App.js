import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then((res) => res.json( ))
    .then(json => {
      setUsers(json.data);
    })
    .catch(err => {
      console.warn(err);
      alert('Receiving user erorr');
    })
    .finally(() => setLoading(false));
  }, []);

  function onChangeSearchValue(event) {
    setSearchValue(event.target.value);
  }

  function onClickInvite(id) {
    if(invites.includes(id)) setInvites(prev => prev.filter(_id => _id !== id))
    else setInvites(prev => [...prev, id])
  }

  function onClickSentInvites() {
    setSuccess(true);
  }

  return (
    <div className="App">
      {
        success ? (
          <Success count={invites.length} />
        ) : (
          <Users 
            onClickSentInvites={onClickSentInvites}
            invites={invites}
            onClickInvite={onClickInvite}
            onChangeSearchValue={onChangeSearchValue}
            searchValue={searchValue}
            items={users} 
            isLoading={isLoading} 
          />
        )
      }
    </div>
  );
}

export default App;

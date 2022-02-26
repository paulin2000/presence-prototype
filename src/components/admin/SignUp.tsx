import React from 'react';

const SignUp = () => {
  return (
    <div className='signup-body'>
      <h1>Create User</h1>
      <div className="signup-container">
        <div className="form-container">
          <div className="form-header">
            <h1>Create New User</h1>
          </div>
          <div className="form-body">
            <form action="">
              <div className="form-group">
                <input type="text" placeholder='Name'/>
                <input type="text" placeholder='Last name'/>
              </div>
              <div className="form-group two">
                <input type="password" placeholder='New password'/>
                <input type="password" placeholder='Confirm password'/>
              </div>
              <div className="form-group">
                <label htmlFor="sexe">Sexe</label>
                <select name="Sexe" id="sexe">
                  <option value="Masculin">Masculin</option>
                  <option value="Feminin">Feminin</option>
                </select>
                <label htmlFor="role">Rôle</label>
                <select name="Rôle" id="role" defaultValue="chois">
                  <option value="Employé">Employé</option>
                  <option value="Comtabilité">Comtabilité</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div className="buton">
                <button className='btn btn-success'>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
// Helpers
import {has} from 'lodash';
import bcrypt from 'bcryptjs';
import User from './schema-mongo';

// Actual query fetching and transformation in DB
export default class ModelClass {
  async getUsers(orderBy, filter) {
    return User.find({}, {}, {
      sort: {id: -1}
    });
  }

  async getUser(id) {
    return User.findOne({id});

  }

  async getUserWithPassword(id) {
    return User.findOne({id});
  }

  async register({username, email, password, role, isActive}) {
    const passwordHashed = await bcrypt.hash(password, 12);

    if (role === undefined) {
      role = 'user';
    }

    return new User({
      username, email, password: passwordHashed, role, isActive: !!isActive
    }).save();
  }

  /*  createFacebookOuth({ id, displayName, userId }) {
      return knex('auth_facebook')
        .insert({ fb_id: id, display_name: displayName, user_id: userId })
        .returning('id');
    }

    createGoogleOuth({ id, displayName, userId }) {
      return knex('auth_google')
        .insert({ google_id: id, display_name: displayName, user_id: userId })
        .returning('id');
    }*/

  async editUser({id, username, email, role, isActive, password}) {
    let localAuthInput = {email};
    if (password) {
      const passwordHashed = await bcrypt.hash(password, 12);
      localAuthInput = {email, password: passwordHashed};
    }
    return User.findOneAndUpdate({id}, {
      $set: {
        username,
        role,
        isActive,
        ...localAuthInput
      }
    });
  }

  async editUserProfile({id, profile}) {
    // const user = await User.findOne({id});
    return User.findOneAndUpdate({id}, {
      $set: {
        userProfile: profile
      }
    });

  }

  deleteUser(id) {
    return User.remove({id});
  }

  async updatePassword(id, newPassword) {
    const password = await bcrypt.hash(newPassword, 12);
    return User.findOneAndUpdate({id}, {
      $set: {
        password
      }
    });
  }

  updateActive(id, isActive) {
    return User.findOneAndUpdate({id}, {
      $set: {
        isActive
      }
    });
  }

  async getUserByEmail(email) {
    return User.findOne({email});
  }

  async getUserByUsername(username) {
    return User.findOne({username});
  }
}
import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Contact } from '../models/Contact';

export class ContactRepository {
  public static async findAll(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM contacts WHERE deleted = FALSE', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const contacts: Contact[] = results as Contact[];
          resolve(contacts);
        }
      });
    });
  }

  public static async findById(contactId: number): Promise<Contact | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM contacts WHERE id = ? AND deleted = FALSE', [contactId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const contacts: Contact[] = results as Contact[];
          resolve(contacts.length > 0 ? contacts[0] : null);
        }
      });
    });
  }

  public static async createContact(contact: Contact): Promise<Contact> {
    const query = `INSERT INTO contacts (first_name, last_name, phone, email, category, is_favorite, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log(contact);
    return new Promise((resolve, reject) => {
      connection.execute(query, [ contact.first_name, contact.last_name, contact.phone, contact.email, contact.category, contact.is_favorite, contact.created_at, contact.created_by, contact.updated_at, contact.updated_by, contact.deleted], (error, result: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            const createdContactId = result.insertId;
            resolve({ ...contact, id: createdContactId });
          }
        }
      );
    });
  }

  public static async updateContact(contactId: number, contactData: Contact): Promise<Contact | null> {
    const query = `
      UPDATE contacts SET first_name = ?, last_name = ?, phone = ?, email = ?, category = ?, 
                          is_favorite = ?, updated_at = ?, updated_by = ?, deleted = ? 
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [
          contactData.first_name, contactData.last_name, contactData.phone,
          contactData.email, contactData.category, contactData.is_favorite,
          contactData.updated_at, contactData.updated_by, contactData.deleted,
          contactId
        ],
        (error, result: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.affectedRows > 0 ? { ...contactData, id: contactId } : null);
          }
        }
      );
    });
  }

  public static async deleteContact(contactId: number): Promise<boolean> {
    const query = 'UPDATE contacts SET deleted = TRUE WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [contactId], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}  

import { ContactRepository } from "../repositories/ContactRepository";
import { Contact } from "../models/Contact";
import { DateUtils } from "../../shared/utils/DateUtils";

export class ContactService {
  public static async getAllContacts(): Promise<Contact[]> {
    return await ContactRepository.findAll();
  }

  public static async getContactById(contactId: number): Promise<Contact | null> {
    return await ContactRepository.findById(contactId);
  }

  public static async addContact(contact: Contact): Promise<Contact> {
    contact.created_at = DateUtils.formatDate(new Date());
    contact.updated_at = DateUtils.formatDate(new Date());
    return await ContactRepository.createContact(contact);
  }

  public static async modifyContact(contactId: number, contactData: Contact): Promise<Contact | null> {
    const existingContact = await ContactRepository.findById(contactId);
    if (existingContact) {
      if (contactData.first_name) existingContact.first_name = contactData.first_name;
      if (contactData.last_name) existingContact.last_name = contactData.last_name;
      if (contactData.phone) existingContact.phone = contactData.phone;
      if (contactData.email) existingContact.email = contactData.email;
      if (contactData.category) existingContact.category = contactData.category;
      if (contactData.is_favorite !== undefined) existingContact.is_favorite = contactData.is_favorite;
      existingContact.updated_by = contactData.updated_by;
      existingContact.updated_at = DateUtils.formatDate(new Date());
      return await ContactRepository.updateContact(contactId, existingContact);
    }
    return null;
  }

  public static async deleteContact(contactId: number): Promise<boolean> {
    return await ContactRepository.deleteContact(contactId);
  }
}

import { Form, useLoaderData, redirect, useNavigate, useSubmit, useActionData } from "react-router-dom";
import {updateContact} from "../contact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import service from "../validationService";

export async function action({request, params}){
    const formData = await request.formData();
    // const first = formData.get("first");
    // const last = formData.get("last");
    // const avatar = formData.get("avatar");
    // const email = formData.get("email");
    // const errorsMsg = {};
    // if(typeof first !== "string" || first.length < 2){
    //   errorsMsg.first = "First name must be at least 2 characters"
    // }
    // if(typeof last !== "string" || last.length < 2){
    //   errorsMsg.last = "Last name must be at least 2 characters"
    // }
    // if(avatar.slice(-4) !== ".jpg"){
    //   errorsMsg.avatar = "Avatar must be a valid JPG"
    // }
    // if(typeof email  !== "string" || !email.includes("@")){
    //   errorsMsg.email = "That doesn't look like an email address"
    // }
    const validation = new service.ValidationService();
    const errorsMsg = validation.demoValidation(formData);
    if(Object.keys(errorsMsg).length){
      return errorsMsg;
    }
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

const ContactSchema = yup.object().shape({
  first: yup.string().required().min(2),
  last: yup.string().required().min(2),
  avatar: yup.string().url(),
  email: yup.string().required().email()
});

export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();
  const errorsMsg = useActionData();
  const { register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(ContactSchema)});
  const onSubmit = data => {
  }

  return (
    <Form method='post' id="contact-form" onChange={handleSubmit(onSubmit)}>
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
          {...register("first")}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
          {...register("last")}
        />
      </p>
      {/* {errors.first && <h4>{errors.first.message}</h4>}
      {errors.last && <h4>{errors.last.message}</h4>} */}
      {errorsMsg?.first && <h4>{errorsMsg.first}</h4>}
      {errorsMsg?.last && <h4>{errorsMsg.last}</h4>}
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
          {...register("twitter")}
        />
      </label>
      {/* {errors.twitter && <h4>{errors.twitter.message}</h4>} */}
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
          {...register("avatar")}
        />
      </label>
      {/* {errors.avatar && <h4>{errors.avatar.message}</h4>} */}
      {errorsMsg?.avatar && <h4>{errorsMsg.avatar}</h4>}
      <label>
        <span>Email</span>
        <input
          name="email"
          type="text"
          placeholder="demo@example.com"
          defaultValue={contact.email}
          {...register("email")}
        />
      </label>
      {/* {errors.email && <h4>{errors.email.message}</h4>} */}
      {errorsMsg?.email && <h4>{errorsMsg.email}</h4>}
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => {
            navigate(-1)
        }}>Cancel</button>
      </p>
    </Form>
  );
}
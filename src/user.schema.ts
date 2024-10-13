import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({unique: true, required: true, trim: true})
  email: string;

  @Prop({required: true, minlength: 8})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)

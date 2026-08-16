import mongoose, { Document, Schema } from 'mongoose';

export interface IOtpStore extends Document {
  email: string;
  otp: string; // This will store the hashed OTP
  type: 'login' | 'register' | 'forgot_password';
  /** pending register payload — stored so we can create the user after OTP verify */
  pendingPayload?: any;
  attempts: number;
  lockUntil?: Date;
  createdAt: Date;
}

const OtpStoreSchema = new Schema<IOtpStore>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['login', 'register', 'forgot_password'],
      required: true,
    },
    pendingPayload: { type: Schema.Types.Mixed },
    attempts: { type: Number, default: 1 },
    lockUntil: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Auto-delete documents after 10 minutes (600 seconds)
OtpStoreSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

// One active OTP per email+type at a time
OtpStoreSchema.index({ email: 1, type: 1 }, { unique: true });

export const OtpStore =
  mongoose.models.OtpStore ||
  mongoose.model<IOtpStore>('OtpStore', OtpStoreSchema);

export default OtpStore;

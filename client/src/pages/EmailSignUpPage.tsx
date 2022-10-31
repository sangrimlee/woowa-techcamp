import React from 'react';
import EmailSignUpLayout from 'layouts/EmailSignUpLayout';
import EmailSignUpForm from 'components/form/EmailSignUpForm';

export default function SignUpPage() {
  return (
    <EmailSignUpLayout>
      <EmailSignUpForm />
    </EmailSignUpLayout>
  );
}

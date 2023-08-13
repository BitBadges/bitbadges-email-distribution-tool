import { useEffect, useState } from 'react';
import { Button, Col, Divider, Input, Row, Steps } from 'antd';


function DistributeCodesPage({ }: {
}) {
  const [emailCodes, setEmailCodes] = useState<{ [email: string]: string }>({

  });

  const [emails, setEmails] = useState<string[]>([]);

  const [codesStr, setCodesStr] = useState<string>('');
  const [codes, setCodes] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>('BitBadges Code');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [message, setMessage] = useState<string>('Your code is: CODE');

  useEffect(() => {
    const emailCodesMap: { [email: string]: string } = {};
    emails.forEach((email, index) => {
      if (index >= codes.length) {
        return;
      }
      emailCodesMap[email] = codes[index % codes.length];
    });
    setEmailCodes(emailCodesMap);
  }, [emails, codes]);

  async function handleCodeDistribution() {
    // Send emails
    await fetch('/api/send-emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emails.map((email) => {
        const msg = {
          to: email,
          from: 'trevormil@comcast.net', // Replace with your own email address
          subject: subject,
          text: message.replace('CODE', emailCodes[email]),
        };
        return msg;
      })),
    });
  }

  return (
    <div style={{ margin: 20 }}>
      <div>

        <h1><b>Instructions</b></h1>
        <br />
        {/* <Steps
          current={currentStep}
          onChange={(step) => {
            setCurrentStep(step);
          }}
          direction="vertical"
        >
          <Steps.Step title={<div style={{ color: 'white' }}>{"Select Codes -> Unique Codes -> Fill out distribution details"}</div>} description={<div> 
            
          </div>} />
          <Steps.Step title={<div style={{ color: 'white' }}>{"Select Codes -> Unique Codes -> Fill out the details"}</div>} />



        </Steps> */}
        <p>
          {"1. On bitbadges.io, when selecting a distribution method, select Codes."}
        </p>
        <p>
          {"2. Fill out the details for your distribution. Make sure to set the number of codes you want to distribute equal to the number of emails."}
        </p>
        <p>
          {"3. Sign and submit the blockchain transaction. Wait until it is confirmed. Fetch all codes from the Claims tab on the collection page."}
        </p>
        <p>
          {"4. Copy and paste your emails into the left box. One per line."}
        </p>
        <p>
          {"5. Copy and paste your codes into the right box. One per line."}
        </p>
        <p>
          {"6. Customize your email subject and message."}
        </p>
        <p>
          {"7. Send your email."}
        </p>
      </div>

      <br />

      <Row style={{ textAlign: 'center' }}>
        <Col span={12}>
          <h1><b>Emails</b></h1>
          <Input.TextArea
            rows={15}
            value={emails.join('\n')}
            onChange={(e) => {
              setEmails(e.target.value.split('\n'));
            }}
          />
        </Col>
        <Col span={12}>
          <h1><b>Codes</b></h1>
          <Input.TextArea
            rows={15}
            value={codesStr}
            onChange={(e) => {
              setCodesStr(e.target.value);
              setCodes(e.target.value.split('\n'));
            }}
          />
        </Col>
      </Row>

      <Divider />
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
        <h1><b>Subject</b></h1>
        <Input
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
      </Row>

      <Divider />
      <Row style={{ display: 'flex', flexDirection: 'column' }}>
        <h1><b>Messsage</b></h1>
        <Input.TextArea
          rows={10}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <p>*We will replace anywhere it says CODE with the respective code.</p>
      </Row>

      <Divider />
      <Row style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
        <Button onClick={handleCodeDistribution}>Send Emails</Button>
      </Row>
    </div >
  );
}


export default DistributeCodesPage;

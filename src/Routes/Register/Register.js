import './Register.scss';

import { DataCollection, RegisterWithRhsm, SetupConfigure, SmartManagement, schema } from './Helpers';
import { Split, SplitItem } from '@patternfly/react-core/dist/esm/layouts/Split/index';
import { Stack, StackItem } from '@patternfly/react-core/dist/esm/layouts/Stack/index';

import { Divider } from '@patternfly/react-core/dist/esm/components/Divider/Divider';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import FormSpy from '@data-driven-forms/react-form-renderer/dist/esm/form-spy';
import { Form as PfForm } from '@patternfly/react-core/dist/esm/components/Form/Form';
import PropTypes from 'prop-types';
import React from 'react';
import { TasksIcon } from '@patternfly/react-icons';
import { Title } from '@patternfly/react-core/dist/esm/components/Title/Title';
import { componentMapper } from '@data-driven-forms/pf4-component-mapper';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

const Register = () => {
    const intl = useIntl();

    const FormTemplate = ({ formFields }) => <Split hasGutter className='ins-c-main-split'>
        <SplitItem className='ins-c-left'>
            <Stack hasGutter >
                <StackItem>
                    <Title headingLevel='h1'>{intl.formatMessage(messages.registerYourSystems)}</Title>
                </StackItem>
                <StackItem>
                    <Title headingLevel='h3'>{intl.formatMessage(messages.stepOneTitle)}</Title>
                    <PfForm>{formFields}</PfForm>
                </StackItem>
            </Stack>
        </SplitItem>
        <SplitItem className='ins-c-right'>
            <Stack hasGutter>
                <StackItem>
                    <Title headingLevel='h3'>
                        <TasksIcon size='md' className='ins-c-icon' />{intl.formatMessage(messages.preinstallationChecks)}
                    </Title>
                </StackItem>
                <StackItem>
                    <ul>
                        <li>
                            <FormSpy>
                                {({ values }) => {
                                    return values['how-are-systems-managed'] === 'rhsm' ? (
                                        <RegisterWithRhsm intl={intl} />
                                    ) : null;
                                }}
                            </FormSpy>
                        </li>
                        <Divider component='li' />
                        <li><DataCollection intl={intl} /></li>
                        <Divider component='li' />
                        <li> <SetupConfigure intl={intl} /></li>
                        <Divider component='li' />
                        <li><SmartManagement intl={intl} /></li>
                        <Divider component='li' />
                    </ul>
                </StackItem>
            </Stack>
        </SplitItem>
    </Split>;

    return <FormRenderer
        schema={schema(intl)}
        componentMapper={componentMapper}
        FormTemplate={props => <FormTemplate {...props} showFormControls={false} />} />;
};

Register.propTypes = {
    formFields: PropTypes.object
};

export default withRouter(Register);
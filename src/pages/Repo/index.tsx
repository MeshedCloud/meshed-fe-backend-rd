import {ActionType, PageContainer, ProList} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Input, Select, Space, Tag} from "antd";
import {getRepoBlob, getRepoDetails, getRepoTree} from "@/services/repo/api";
import {SPECIFIC_FILES} from "@/services/repo/constant";
import {Repo, RepoFile} from "@/services/repo/repo";
import {useMatch} from "@umijs/max"
import {ArrowLeftOutlined, CopyOutlined, HomeOutlined} from "@ant-design/icons";
import CodeBlock from "@/components/CodeBlock";
import {BaseOptionType} from "_rc-select@14.1.13@rc-select/lib/Select";
import {authentication, clipboardWrite} from "@/common/copy";
import {history} from "@@/core/history";


const RepoDetails: React.FC = () => {
  // @ts-ignore
  const {params: {repositoryId}} = useMatch('/repo/:repositoryId')
  const [path, setPath] = useState<string>('/')
  const [lastPath, setLastPath] = useState<string>('/')
  const [currentType, setCurrentType] = useState<string>('tree')
  const [refName, setRefName] = useState<string>('master')
  const [branchs, setBranchs] = useState<BaseOptionType[]>([{label: 'master', value: 'master'}])
  const [repo, setRepo] = useState<Repo>()
  const [blob, setBlob] = useState<string>()
  const actionRef = useRef<ActionType>();
  const getFileIcon = (type: string, filename: string) => {
    if (filename === undefined || filename.length <= 0) {
      return "https://s.meshed.cn/meshed/svg/file/other.svg";
    }
    if (type === 'tree') {
      return "https://s.meshed.cn/meshed/svg/file/folder.svg";
    } else if (type === 'blob') {
      if (SPECIFIC_FILES.includes(filename.toLowerCase())) {
        return `https://s.meshed.cn/meshed/svg/file/${filename.toLowerCase()}.svg`;
      } else {
        var suffix = filename.split('.').pop();//.txt
        return `https://s.meshed.cn/meshed/svg/file/${suffix}.svg`;
      }

    }
    return "https://s.meshed.cn/meshed/svg/file/other.svg";

  }

  const getBlob = async (path: string) => {
    setBlob('')
    const res = await getRepoBlob({repositoryId, path, refName})
    if (res.success) {
      setBlob(res.data)
    }

  }

  const getDetails = async (repoId: string) => {
    const res = await getRepoDetails(repoId)
    if (res.success && res.data) {

      setRepo(res.data)
      if (res.data.branchs && res.data.branchs.length > 0) {
        const branchs: BaseOptionType[] = []
        for (let branch of res.data.branchs) {
          branchs.push({
            label: branch, value: branch
          })
        }
        setBranchs(branchs)
      }
    }
  }

  const branchChange = (value: string) => {
    setRefName(value)
    setPath("/")
    setLastPath("/")
    setCurrentType("tree")
    actionRef.current?.reload()
  };

  useEffect(() => {
    authentication()
    getDetails(repositoryId);
  }, [])

  return (
    <PageContainer title={<div>
      <div>
            <span style={{
              fontSize: 25,
              fontWeight: "bold",
              marginRight: "10px"
            }}>{repo?.name}</span>
        <Tag color="#108ee9">{repo?.repoName}</Tag>
      </div>
      <div style={{
        fontSize: 18,
        fontWeight: "normal"
      }}>
        {repo?.description}
      </div>
      <div>
        <Button type="link" icon={<ArrowLeftOutlined/>} onClick={() => {
          history.back()
        }
        }>返回项目详情</Button>
      </div>
    </div>}
    >
      <div style={{
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: '10px'
      }}>
        <div style={{
          display: "flex",
          flexDirection: 'row',
        }}>
          <Select
            defaultValue="master"
            style={{width: 120}}
            onChange={branchChange}
            options={branchs}
          />


          <div style={{
            marginLeft: "10px",
            verticalAlign: "top"
          }}>
            {path === '/' ? <div>{path}</div> : <Space>
              <Button type="link" icon={<HomeOutlined/>} onClick={() => {
                setPath('/')
                setCurrentType('tree')
                actionRef.current?.reload()
              }}/>
              <Button type="link" icon={<ArrowLeftOutlined/>} onClick={() => {
                setPath(lastPath)
                setCurrentType('tree')
                actionRef.current?.reload()
              }}/>
              <div>{path}</div>
            </Space>}
          </div>
        </div>

        <div>
          <Input placeholder="仓库地址" addonAfter={<CopyOutlined onClick={() => {
            clipboardWrite(repo?.repoUrl)
          }}/>} value={repo?.repoUrl} disabled/>
        </div>
      </div>

      {
        currentType === 'tree' ? <ProList<RepoFile>
          rowKey="id"
          actionRef={actionRef}
          // headerTitle={
          //
          // }
          request={params => getRepoTree({repositoryId, path, refName, type: 'DIRECT', ...params})}
          showActions="hover"

          metas={{
            title: {
              render: (_, row) => {
                return <>
                  <Avatar size="small" shape="square" src={getFileIcon(row.type, row.name)}/>
                  <Button type="link" onClick={() => {
                    setLastPath(path)
                    setPath(row.path)
                    setCurrentType(row.type)
                    if (row.type === 'tree') {
                      actionRef.current?.reload()
                    } else if (row.type === 'blob') {
                      getBlob(row.path);
                    }

                  }}>{row.name}</Button>
                </>
              }
            },
          }}
        /> : <CodeBlock codeKey={refName} language="java" code={blob}/>

      }


    </PageContainer>
  );
};

export default RepoDetails;
